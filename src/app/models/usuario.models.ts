export class Usuario {
    constructor(
        public uid: string,
        public nombre: string, 
        public email: string,
    ) {}
    
    newUser ()  {
        return {
            uid:    this.uid,
            nombre: this.nombre,
            email : this.email
        }
    }
}