using apiNoWaste.Data;
using apiNoWaste.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace apiNoWaste.Controllers;

[ApiController]
[Route("receitas")]
public class ReceitaController : ControllerBase
{
    private readonly AppDbContext _db;

    public ReceitaController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<IActionResult> Listar()
    {
        var receitas = await _db.Receita.ToListAsync();
        return Ok(receitas);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Buscar(int id)
    {
        var receita = await _db.Receita.FindAsync(id);
        if (receita is null) return NotFound();
        return Ok(receita);
    }

    [HttpPost]
    public async Task<IActionResult> Criar([FromBody] Receita receita)
    {
        _db.Receita.Add(receita);
        await _db.SaveChangesAsync();
        return Created($"/receitas/{receita.IdReceita}", receita);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Atualizar(int id, [FromBody] Receita receita)
    {
        var dados = await _db.Receita.FindAsync(id);
        if (dados is null) return NotFound();

        dados.Nome = receita.Nome;
        dados.ModoPreparo = receita.ModoPreparo;
        dados.Imagem = receita.Imagem;

        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Excluir(int id)
    {
        var receita = await _db.Receita.FindAsync(id);
        if (receita is null) return NotFound();

        _db.Receita.Remove(receita);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
