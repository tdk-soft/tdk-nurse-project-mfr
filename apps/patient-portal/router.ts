import { NextRequest, NextResponse } from "next/server"
import { appointmentSchema } from "@/domain/appointment.schema"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Validation backend (CRITIQUE)
    const parsed = appointmentSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten() },
        { status: 400 }
      )
    }

  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
  
}