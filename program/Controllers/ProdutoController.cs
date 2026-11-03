using apiNoWaste.Data;
using apiNoWaste.Models;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace apiNoWaste.Controllers;

[ApiController]
[Authorize]
[Route("produtos")]
public class ProdutoController : ControllerBase
{
    private readonly AppDbContext _db;

    public ProdutoController(AppDbContext db)
    {
        _db = db;
    }

    private int UsuarioAtual => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    [HttpGet]
    public async Task<IActionResult> Listar()
    {
        var produtos = await _db.Produto.Where(p => p.IdUsuario == UsuarioAtual).ToListAsync();
        return Ok(produtos);
    }

    // Mantém o comportamento original: o id na rota representa o usuário.
    [HttpGet("{id}")]
    public async Task<IActionResult> ListarPorUsuario(int id)
    {
        if (id != UsuarioAtual) return Forbid();
        var produtos = await _db.Produto
            .Where(p => p.IdUsuario == id)
            .ToListAsync();
        return Ok(produtos);
    }

    [HttpPost]
    public async Task<IActionResult> Criar([FromBody] Produto produto)
    {
        if (string.IsNullOrWhiteSpace(produto.Nome) || produto.Quantidade <= 0)
            return BadRequest("Informe nome e quantidade maior que zero.");
        if (!await _db.Categoria.AnyAsync(c => c.IdCategoria == produto.IdCategoria))
            return BadRequest("A categoria informada não existe.");

        produto.IdProduto = 0;
        produto.IdUsuario = UsuarioAtual;
        _db.Produto.Add(produto);
        await _db.SaveChangesAsync();
        return Created($"/produtos/{produto.IdProduto}", produto);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Atualizar(int id, [FromBody] Produto produto)
    {
        var dados = await _db.Produto.FindAsync(id);
        if (dados is null) return NotFound();
        if (dados.IdUsuario != UsuarioAtual) return NotFound();
        if (string.IsNullOrWhiteSpace(produto.Nome) || produto.Quantidade <= 0)
            return BadRequest("Informe nome e quantidade maior que zero.");

        if (dados.IdCategoria != produto.IdCategoria &&
            !await _db.Categoria.AnyAsync(c => c.IdCategoria == produto.IdCategoria))
        {
            return BadRequest("Erro: o IdCategoria informado não existe!");
        }

        dados.Nome = produto.Nome;
        dados.IdCategoria = produto.IdCategoria;
        dados.Quantidade = produto.Quantidade;
        dados.DataValidade = produto.DataValidade;

        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Excluir(int id)
    {
        var produto = await _db.Produto.FindAsync(id);
        if (produto is null) return NotFound();
        if (produto.IdUsuario != UsuarioAtual) return NotFound();

        _db.Produto.Remove(produto);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
