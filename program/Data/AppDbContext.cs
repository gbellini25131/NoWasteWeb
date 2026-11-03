using apiNoWaste.Models;
using Microsoft.EntityFrameworkCore;

namespace apiNoWaste.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Categoria> Categoria { get; set; }
    public DbSet<Produto> Produto { get; set; }
    public DbSet<Receita> Receita { get; set; }
    public DbSet<Usuario> Usuario { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema("NoWaste");

        modelBuilder.Entity<Categoria>().HasKey(c => c.IdCategoria);
        modelBuilder.Entity<Categoria>().Property(c => c.Nome).HasColumnType("varchar(255)");

        modelBuilder.Entity<Produto>().HasKey(p => p.IdProduto);
        modelBuilder.Entity<Produto>().Property(p => p.Nome).HasColumnType("varchar(255)");
        modelBuilder.Entity<Produto>().HasOne<Categoria>().WithMany().HasForeignKey(p => p.IdCategoria);
        modelBuilder.Entity<Produto>().HasOne<Usuario>().WithMany().HasForeignKey(p => p.IdUsuario);
        modelBuilder.Entity<Produto>().Property(p => p.Quantidade).HasColumnType("int");
        modelBuilder.Entity<Produto>().Property(p => p.DataValidade).HasColumnType("date");


        modelBuilder.Entity<Usuario>().HasKey(u => u.IdUsuario);
        modelBuilder.Entity<Usuario>().Property(u => u.Nome).IsRequired().HasColumnType("varchar(255)");
        modelBuilder.Entity<Usuario>().Property(u => u.Email).IsRequired().HasColumnType("varchar(255)");
        modelBuilder.Entity<Usuario>().Property(u => u.Senha).IsRequired().HasColumnType("varchar(255)");

        modelBuilder.Entity<Receita>().HasKey(r => r.IdReceita);
        modelBuilder.Entity<Receita>().Property(r => r.Nome).HasColumnType("varchar(255)");
        modelBuilder.Entity<Receita>().Property(r => r.ModoPreparo).HasColumnType("text");
        modelBuilder.Entity<Receita>().Property(r => r.Imagem).HasColumnType("varchar(255)");
    }
}