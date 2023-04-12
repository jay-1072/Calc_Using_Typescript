namespace memory {
    export interface IMemoryMethods {
        memoryStore: ()=>void;
        memoryRead: ()=>void;
        memoryClear: ()=>void;
        memoryPlus: ()=>void;
        memoryMinus: ()=>void;
        createMemoryTable: ()=>void;    
    }
}
