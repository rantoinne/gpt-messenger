import openai from '@/lib/chatGpt';
import { NextResponse } from 'next/server';
import { ModelsPage } from 'openai/resources/models.mjs';

// Refactor and modularise
export async function GET() {
  const models: ModelsPage = await openai.models.list();

  const modelsMap = models.data.map(model => ({
    value: model.id,
    label: model.id,
  }))

  return NextResponse.json({ modelsMap });
};
