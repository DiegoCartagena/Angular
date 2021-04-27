import jwt from 'jsonwebtoken';




export default class Token{
    private static semilla : string = 'semilla-seed.privacidadPropia-Diego'
    private static caducidad: string ='1h'; //media hora //1h = 1hora; 1d=1dia;
    constructor(){}

    static getToken(payload: any ):string{
        return jwt.sign({
            usuario:payload},
            this.semilla, {expiresIn: this.caducidad }
      );

    }

    static comprobarToken(userToken: string){
        return new Promise((resolve, reject) =>{
            jwt.verify(userToken, this.semilla,(err, decoded) =>{
                if (err) {
                    reject();
                }else{
                    resolve(decoded);
                }

            });

        });

    }

}