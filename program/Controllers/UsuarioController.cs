using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using apiNoWaste.Data;
using apiNoWaste.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace apiNoWaste.Controllers;

[ApiController]
[Authorize]
[Route("usuarios")]
public class UsuarioController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly IConfiguration _config;

    public UsuarioController(AppDbContext db, IConfiguration config)
    {
        _db = db;
        _config = config;
    }

    private int UsuarioAtual => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    [HttpGet]
    public async Task<IActionResult> Listar()
    {
        var usuarios = await _db.Usuario
            .Where(u => u.IdUsuario == UsuarioAtual)
            .Select(u => new { u.IdUsuario, u.Nome, u.Email })
            .ToListAsync();
        return Ok(usuarios);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Buscar(int id)
    {
        if (id != UsuarioAtual) return Forbid();
        var usuario = await _db.Usuario
            .Where(u => u.IdUsuario == id)
            .Select(u => new { u.IdUsuario, u.Nome, u.Email })
            .FirstOrDefaultAsync();
        if (usuario is null) return NotFound();
        return Ok(usuario);
    }

    [HttpPost]
    [AllowAnonymous]
    public async Task<IActionResult> Criar([FromBody] Usuario usuario)
    {
        if (await _db.Usuario.AnyAsync(u => u.Email == usuario.Email))
        {
            return BadRequest("Já existe um usuário com esse email.");
        }

        usuario.Senha = BCrypt.Net.BCrypt.HashPassword(usuario.Senha);
        _db.Usuario.Add(usuario);
        await _db.SaveChangesAsync();

        return Created($"/usuarios/{usuario.IdUsuario}",
            new { usuario.IdUsuario, usuario.Nome, usuario.Email });
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Atualizar(int id, [FromBody] AtualizacaoUsuario usuario)
    {
        if (id != UsuarioAtual) return Forbid();
        var dados = await _db.Usuario.FindAsync(id);
        if (dados is null) return NotFound();

        if (string.IsNullOrWhiteSpace(usuario.Nome) || string.IsNullOrWhiteSpace(usuario.Email))
            return BadRequest("Nome e email são obrigatórios.");
        if (await _db.Usuario.AnyAsync(u => u.Email == usuario.Email && u.IdUsuario != id))
            return BadRequest("Já existe um usuário com esse email.");

        if (!string.IsNullOrWhiteSpace(usuario.Senha) &&
            (string.IsNullOrWhiteSpace(usuario.SenhaAtual) ||
             !BCrypt.Net.BCrypt.Verify(usuario.SenhaAtual, dados.Senha)))
            return BadRequest("A senha atual está incorreta.");

        dados.Nome = usuario.Nome;
        dados.Email = usuario.Email;

        if (!string.IsNullOrWhiteSpace(usuario.Senha))
        {
            dados.Senha = BCrypt.Net.BCrypt.HashPassword(usuario.Senha);
        }

        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Excluir(int id)
    {
        if (id != UsuarioAtual) return Forbid();
        var usuario = await _db.Usuario.FindAsync(id);
        if (usuario is null) return NotFound();

        _db.Usuario.Remove(usuario);
        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<IActionResult> Entrar([FromBody] Login dados)
    {
        if (string.IsNullOrWhiteSpace(dados.Email) ||
            string.IsNullOrWhiteSpace(dados.Senha))
        {
            return BadRequest("Email ou senha inválidos!");
        }

        var usuario = await _db.Usuario
            .FirstOrDefaultAsync(u => u.Email == dados.Email);

        if (usuario is null ||
            !BCrypt.Net.BCrypt.Verify(dados.Senha, usuario.Senha))
        {
            return Unauthorized();
        }

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, usuario.IdUsuario.ToString()),
            new Claim(ClaimTypes.Name, usuario.Nome),
            new Claim(ClaimTypes.Email, usuario.Email)
        };

        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(2),
            signingCredentials: creds);

        var tokenString = new JwtSecurityTokenHandler().WriteToken(token);
        return Ok(new
        {
            mensagem = "Login realizado com sucesso!",
            token = tokenString,
            idUsuario = usuario.IdUsuario
        });
    }
}

public record AtualizacaoUsuario(string Nome, string Email, string? SenhaAtual, string? Senha);
