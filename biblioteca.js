// objetos - livros e usuário;
// arrays - lista de livros e lista de usuários;
// sistema voltado para o uso da biblioteca e nao do cliente;

let livros = [];

let usuarios = [];

let emprestAtivos = [];

async function sistemaBiblioteca () {

while (true) {
    let menu = prompt (`
        O que deseja fazer?
        0 - Cadastrar livro.
        1 - Cadastrar usuários.
        2 - Registrar empréstimo.
        3 - Registar devolução.
        4 - Relatórios.
        5 - Sair.
        `);
        
        switch (menu){
            case "0":
                await cadastrarLivro ();
                break;

                case "1":
                    await cadastratarUsuario ();
                    break;

                    case "2":
                        await fazerEmprestimo ();
                        break;

                        case "3":
                            // registrar devolucao
                            break;

                            case "4":
                                //relatorios
                                break;
                                case "5":
                                    return;
        };
    };
};

sistemaBiblioteca ();

async function cadastrarLivro (){
    let titulo = prompt ("Título do livro:");
    let autor = prompt ("Autor:");
    let ano = prompt ("Ano de publicação:");
    let disponibilidade = prompt ("Disponíveis:")

    let livro = {
        titulo: titulo,
        autor: autor,
        ano: ano,
        disponibilidade: disponibilidade
    };

    const file = Bun.file ("livros.json");
    const fileExist = await file.exists ();

    

    if (fileExist){
        livros = await file.json ();
    };

    livros.push (livro);
    await Bun.write ("livros.json", JSON.stringify (livros));

    console.log ("Livro cadastrado!")
};

async function cadastratarUsuario (){
    let nome = prompt ("Nome:");
    let email = prompt ("e-mail:");
    let telefone = prompt ("Telefone:");

    let usuario = {
        nome: nome,
        email: email,
        telefone: telefone
    };

    const file = Bun.file ("usuarios.json");
    const fileExist  = await file.exists ();

    if (fileExist){
        usuarios = await file.json ();
    };

    usuarios.push (usuario);
    await Bun.write ("usuarios.json", JSON.stringify (usuarios));

    console.log ("Usuário cadastrado!");
};

async function fazerEmprestimo(){
    const file = Bun.file ("usuarios.json");
    const fileExist = await file.exists ();

    if (fileExist){
        usuarios = await file.json ();
    }

    let confirmCadastro = prompt ("Digite o usuário que realizará o empréstimo:");

    let usuarioEncontrado = usuarios.find (usuario => usuario.nome === confirmCadastro);

    if (usuarioEncontrado){
        console.log ("Usuário encontrado!.");

        const file = Bun.file ("livros.json");
        const fileExist = await file.exists ();

        if (fileExist){
            livros = await file.json ();
        };

        let livroEmprestado = prompt ("Título do livro:");

        let livroDisponivel = livros.find (livro => livro.titulo === livroEmprestado);

        if (livroDisponivel){
            const dias = 7;
            const data = new Date ();
            data.setDate (data.getDate () + dias);
            data.toLocaleDateString ("pt-BR");
            console.log ("Emprestimo concluído! Data de devolução:" + data);

            let emprestimo = {
                usuario: usuarioEncontrado,
                livro: livroDisponivel,
                devolucao: data 
            };

            const file = Bun.file ("emprestAtivos.json");
            const fileExist = await file.exists ();

            if (fileExist){
                emprestAtivos = await file.json ();
            };

            emprestAtivos.push (emprestimo);
            await Bun.write ("emprestAtivos.json", JSON.stringify (emprestAtivos));
        } else {
            console.log ("O livro não está disponível!");
        };
    } else {
        console.log ("Usuário não encontrado!");
    };
};

async function registrarDevolucao (){
    let confirmUsuario = prompt ("Usuário:");
    let confirmLivro = prompt ("Livro:");
    let dataDevolucao = prompt ("Data da devolução:");

    
}