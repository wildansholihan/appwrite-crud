/* eslint-disable @typescript-eslint/no-unused-vars */

import client from "@/lib/appwrite_client";
import { Databases } from "appwrite";
import { NextRequest, NextResponse } from "next/server";

const database = new Databases(client);

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

// ✅ GET /api/interpretations/[id]
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const interpretation = await fetchInterpretation(params.id);
    return NextResponse.json({ interpretation });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch interpretation" },
      { status: 500 }
    );
  }
}

// ✅ DELETE /api/interpretations/[id]
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await deleteInterpretation(params.id);
    return NextResponse.json({ message: "Interpretation deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete interpretation" },
      { status: 500 }
    );
  }
}

// ✅ PUT /api/interpretations/[id]
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await req.json();
    await updateInterpretation(params.id, data);
    return NextResponse.json({ message: "Interpretation updated" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update interpretation" },
      { status: 500 }
    );
  }
}