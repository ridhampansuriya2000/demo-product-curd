import { NextResponse } from 'next/server';

export async function GET() {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    return NextResponse.json(data);
}

export async function POST(req: Request) {
    const newProduct = await req.json();
    return NextResponse.json(newProduct, { status: 201 });
}

export async function PUT(req: Request) {
    const updatedProduct = await req.json();
    return NextResponse.json(updatedProduct);
}

export async function DELETE(req: Request) {
    const { id } = await req.json();
    return NextResponse.json({ message: `Product ${id} deleted successfully` });
}