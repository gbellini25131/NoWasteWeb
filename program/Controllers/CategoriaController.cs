using apiNoWaste.Data;
using apiNoWaste.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace apiNoWaste.Controllers;

[ApiController]
[Authorize]
[Route("categorias")]
public class CategoriaController : ControllerBase
{
    private readonly AppDbContext _db;

    public CategoriaController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<IActionResult> Listar()
    {
        var categorias = await _db.Categoria.ToListAsync();
        return Ok(categorias);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Buscar(int id)
    {
        var categoria = await _db.Categoria.FindAsync(id);
        if (categoria is null) return NotFound();
        return Ok(categoria);
    }

    [HttpPost]
    public async Task<IActionResult> Criar([FromBody] Categoria categoria)
    {
        _db.Categoria.Add(categoria);
        await _db.SaveChangesAsync();
        return Created($"/categorias/{categoria.IdCategoria}", categoria);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Atualizar(int id, [FromBody] Categoria categoria)
    {
        var dados = await _db.Categoria.FindAsync(id);
        if (dados is null) return NotFound();

        dados.Nome = categoria.Nome;
        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Excluir(int id)
    {
        var categoria = await _db.Categoria.FindAsync(id);
        if (categoria is null) return NotFound();

        _db.Categoria.Remove(categoria);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
