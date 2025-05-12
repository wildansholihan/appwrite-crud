/* eslint-disable @typescript-eslint/no-unused-vars */

import client from "@/lib/appwrite_client";
import { Databases } from "appwrite";
import { NextRequest, NextResponse } from "next/server";

const database = new Databases(client);

// Type untuk context route
type RouteContext = {
  params: { id: string };
};

// Ambil satu interpretasi berdasarkan ID
async function fetchInterpretation(id: string) {
  try {
    const interpretation = await database.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      "Interpretations",
      id
    );
    return interpretation;
  } catch (error) {
    console.error("Error fetching interpretation", error);
    throw new Error("failed to fetch interpretation");
  }
}

// Hapus interpretasi berdasarkan ID
async function deleteInterpretation(id: string) {
  try {
    await database.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      "Interpretations",
      id
    );
  } catch (error) {
    console.error("Error deleting interpretation", error);
    throw new Error("failed to delete interpretation");
  }
}

// Update interpretasi berdasarkan ID dan data baru
async function updateInterpretation(
  id: string,
  data: { term: string; interpretation: string }
) {
  try {
    await database.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      "Interpretations",
      id,
      data
    );
  } catch (error) {
    console.error("Error updating interpretation", error);
    throw new Error("failed to update interpretation");
  }
}

// GET /api/interpretation/[id]
export async function GET(req: NextRequest, context: RouteContext) {
  try {
    const id = context.params.id;
    const interpretation = await fetchInterpretation(id);
    return NextResponse.json({ interpretation });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch interpretation" },
      { status: 500 }
    );
  }
}

// DELETE /api/interpretation/[id]
export async function DELETE(req: NextRequest, context: RouteContext) {
  try {
    const id = context.params.id;
    await deleteInterpretation(id);
    return NextResponse.json({ message: "Interpretation deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete interpretation" },
      { status: 500 }
    );
  }
}

// PUT /api/interpretation/[id]
export async function PUT(req: NextRequest, context: RouteContext) {
  try {
    const id = context.params.id;
    const interpretation = await req.json();
    await updateInterpretation(id, interpretation);
    return NextResponse.json({ message: "Interpretation updated" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update interpretation" },
      { status: 500 }
    );
  }
}