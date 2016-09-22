export class Terminal{
    id: number;
    isOpen: boolean;
    
    constructor(id: number){
        this.id = id;
        this.isOpen = false;
    }
    
    open(): void{
        this.isOpen = true;
    }
    
    close(): void{
        this.isOpen = false;
    }
}