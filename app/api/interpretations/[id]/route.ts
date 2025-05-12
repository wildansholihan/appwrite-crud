/* eslint-disable @typescript-eslint/no-unused-vars */


import client from "@/lib/appwrite_client";
import { Databases } from "appwrite";
import next from "next";
import { NextResponse } from "next/server";

const database = new Databases(client);

// Fetch a specific interpretation

async function fetchInterpretation(id: string) {
    try {
        
        const interpretation = await database.getDocument(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, "Interpretations", id);
        return interpretation;
    } catch (error) {
        
        console.error('Error fetching interpretation', error);
        throw new Error('failed to fetch interpretation');

    }
    
}

// Delete a specific interpretation

async function deleteInterpretation(id: string) {
    try {
        const response = await database.deleteDocument(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, "Interpretations", id)
    } catch (error) {
        console.error('Error deleting interpretation', error);
        throw new Error('failed to delete interpretation');
    }
}

// Delete a specific interpretation

async function updateInterpretation(id: string, data: {term: string, interpretation: string}) {
    try {
        const response = await database.updateDocument(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, "Interpretations", id, data)
    } catch (error) {
        console.error('Error updating interpretation', error);
        throw new Error('failed to update interpretation');
    }
}

export async function GET(
    req: Request,
    {params}: {params: {id: string}}
    ) {
        try {
            const id = params.id;
            const interpretation = await fetchInterpretation(id)
            return NextResponse.json({interpretation});
        } catch (error) {
            return NextResponse.json(
                {error: "Failed to fetch interpretation"},
                {status: 500}
            );
    }
}

export async function DELETE(
    req: Request,
    {params}: {params: {id: string}}
    ) {
        try {
            const id = params.id;
            await deleteInterpretation(id)
            return NextResponse.json({message: "Interpretation deleted successfully"});
        } catch (error) {
            return NextResponse.json(
                {error: "Failed to delete interpretation"},
                {status: 500}
            );
    }
}

export async function PUT(
    req: Request,
    {params}: {params: {id: string}}
    ) {
        try {
            const id = params.id;
            const interpretation  = await req.json();
            await updateInterpretation(id, interpretation)
            return NextResponse.json({message: "Interpretation updated"});
        } catch (error) {
            return NextResponse.json(
                {error: "Failed to update interpretation"},
                {status: 500}
            );
    }
}