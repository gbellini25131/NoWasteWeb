using Microsoft.AspNetCore.Mvc;

namespace apiNoWaste.Controllers;

[ApiController]
public class StatusController : ControllerBase
{
    [HttpGet("/")]
    public string Inicio() => "API funcionando!";
}
