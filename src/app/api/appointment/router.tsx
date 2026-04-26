id="api1"
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/infrastructure/prisma/client"
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

    const data = parsed.data

    // 🔒 Vérification disponibilité
    const existing = await prisma.appointment.findFirst({
      where: {
        date: data.date,
        time: data.time
      }
    })

    if (existing) {
      return NextResponse.json(
        { error: "Créneau déjà réservé" },
        { status: 409 }
      )
    }

    // 💾 Création
    const appointment = await prisma.appointment.create({
      data
    })

    return NextResponse.json(appointment, { status: 201 })

  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}