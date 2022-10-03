const users = require("../repositories/users.js");

const Login = {
    userLogin: (req, res) => {
        const { name, password } = req.body;
        let token = false;

        users.some((element) => {
            if (element.name == name && element.password == password) {
                token = element.token;
            }
        });

        if (!token) {
            const user = {
                name: req.body.name,
                password: req.body.password,
                token: `${req.body.name}-${req.body.password}-${
                    Math.random() * 100
                }`,
                notes: "",
            };

            users.push(user);
            token = user.token;
        }

        const note = `
        <!DOCTYPE html>
            <html lang="pt-br">
                <head>
                    <meta charset="UTF-8" />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Login</title>
                    <link
                        rel="shortcut icon"
                        href="https://img.icons8.com/external-flaticons-flat-flat-icons/64/000000/external-login-100-most-used-icons-flaticons-flat-flat-icons.png"
                        type="image/x-icon"
                    />
                    <link rel="stylesheet" href="style.css" />
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap"
                        rel="stylesheet"
                    />
                </head>
                <body>
                    <section id="container">
                        <div id="box-login">
                            <form action="/note" method="post">
                                <h1>Notas de ${name}</h1>
                                <div class="ipt-form">
                                    <label for="user-note">Escreva sua anotação:</label>
                                    <textarea
                                        name="note"
                                        id="user-note"
                                        cols="30"
                                        rows="5"
                                    ></textarea>
                                </div>

                                <button type="submit">Salvar</button>
                                <input type="hidden" id="userId" name="token" value="${token}" />
                            </form>
                        </div>
                    </section>
                </body>
            </html>

        `;
        res.send(note);
    },
    userNotes: (req, res) => {
        const { token, note } = req.body;
        let notes;

        users.forEach((element) => {
            if (element.token == token) {
                element.notes += `${note}</br>`;
                notes = element.notes;
            }
        });

        const response = `
        <!DOCTYPE html>
        <html lang="pt-br">
            <head>
                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Login</title>
                <link
                    rel="shortcut icon"
                    href="https://img.icons8.com/external-flaticons-flat-flat-icons/64/000000/external-login-100-most-used-icons-flaticons-flat-flat-icons.png"
                    type="image/x-icon"
                />
                <link rel="stylesheet" href="style.css" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link
                    href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>
                <section id="container">
                    <div id="box-login">
                        <div id="container-resp">
                            <h1>Suas Anotações</h1>
                            <div id="response">
                                <p>${notes}</p>
                            </div>
                        </div>                        
                    </div>
                </section>
            </body>
        </html>
        `;

        res.send(response);
    },
};

module.exports = Login;
