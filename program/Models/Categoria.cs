using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace apiNoWaste.Models
{
    [Table("Categoria")]
    public class Categoria
    {
        [Key]
        [Column("id_categoria")]
        public int IdCategoria { get; set; }
        
        [Column("nome")]
        public string Nome { get; set; } = string.Empty;
    }
}