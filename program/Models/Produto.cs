using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace apiNoWaste.Models
{
    [Table("Produto")]
    public class Produto
    {
        [Key]
        [Column("id_produto")]
        public int IdProduto { get; set; }

        [Column("nome")]
        public string Nome { get; set; } = string.Empty;

        [Column("id_categoria")]
        public int IdCategoria { get; set; }

        [Column("id_usuario")]
        public int IdUsuario { get; set; }

        [Column("quantidade")]
        public int Quantidade { get; set; }

        [Column("data_validade")]
        public DateOnly DataValidade { get; set; }
    }
}