# NoWaste: frontend Next.js + API MVC + Spoonacular

## Configuração

1. Configure o banco SQL Server e as configurações de JWT em `appsettings.json` (ou preferencialmente em User Secrets/variáveis de ambiente). Não publique credenciais.
2. Execute a API MVC, que usa .NET 10, na porta indicada pelo `Properties/launchSettings.json` (originalmente `http://localhost:5020`):

   ```bash
   dotnet run
   ```

3. Em `View/`, crie um arquivo `.env.local` com:

   ```env
   API_BASE_URL=http://localhost:5020
   SPOONACULAR_API_KEY=COLOQUE_SUA_CHAVE_AQUI
   ```

   A chave deve ser obtida na conta Spoonacular. Ela fica somente no servidor Next.js, sem o prefixo `NEXT_PUBLIC_`.
4. Também dentro de `View/`, execute:

   ```bash
   npm install
   npm run dev
   ```

   Acesse `http://localhost:3000` e faça o cadastro/login. Após cadastrar, a aplicação encaminha para login.

## O que usa dados reais

- Cadastro e login: `POST /usuarios` e `POST /usuarios/login`.
- Perfil: `GET /usuarios/{id}` e `PUT /usuarios/{id}`.
- Estoque: `GET /produtos` (somente do usuário logado), `POST /produtos`, `PUT /produtos/{id}`, `DELETE /produtos/{id}`.
- Categorias: `GET /categorias`; quando a categoria digitada não existe, `POST /categorias`.
- Busca: `GET /recipes/findByIngredients` da Spoonacular, considerando os produtos com quantidade positiva e validade não expirada.
- Receita aberta: `GET /recipes/{id}/information` da Spoonacular.

O frontend chama rotas `/api/...` do próprio Next.js. Elas encaminham as operações de estoque à API MVC e mantêm a chave Spoonacular somente no servidor. As respostas não têm cache; não há dados de produtos ou receitas de demonstração embutidos nas telas.

## Limitações da estrutura fornecida

- A tabela `Produto` não possui colunas de local de armazenamento ou observações. Esses campos foram retirados do formulário para evitar que parecessem ser gravados.
- A quantidade da API é um número **inteiro sem unidade**. Informe, por exemplo, `2` unidades, sem `kg`, `g` ou `mL`.
- O Spoonacular trabalha principalmente com ingredientes em inglês. Uma tradução simples de ingredientes comuns em português está em `View/util/spoonacular.ts`; outros nomes são enviados como cadastrados, e a correspondência pode ser limitada.
- As sugestões são buscas externas, e **não** são salvas na tabela `Receita` do SQL Server. Podem variar conforme o estoque e o retorno da Spoonacular.
- O carregamento de detalhes e de receitas depende de uma chave válida, de acesso às APIs e da cota do Spoonacular.
- Sem acesso ao SQL Server configurado e à chave Spoonacular, não é possível executar testes completos de ponta a ponta.
