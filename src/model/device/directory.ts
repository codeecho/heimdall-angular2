import {DiskItem} from './disk_item';

export class Directory extends DiskItem{

    private _children: DiskItem[];

	constructor(name: string, parent?: Directory) {
		super(name, parent);
	}

	public get children(): DiskItem[] {
		return this._children;
	}

    public addChild(child: DiskItem): void{
        this._children.push(child);
    }

}