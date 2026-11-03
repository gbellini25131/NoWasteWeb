using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace apiNoWaste.Models
{
    [Table("Receita")]
    public class Receita
    {
        [Key]
        [Column("id_receita")]
        public int IdReceita { get; set; }

        [Column("nome")]
        public string Nome { get; set; } = string.Empty;

        [Column("modo_preparo")]
        public string ModoPreparo { get; set; } = string.Empty;

        [Column("imagem")]
        public string Imagem { get; set; } = string.Empty;
    }
}