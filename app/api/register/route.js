import connectDB from '@/db/connectDb';
import { streamToJSON } from '@/db/methods';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(request) {
  if (request.method === 'POST') {
    const body = await streamToJSON(request.body);
    const { email, password } = body;
    const username = email.split('@')[0];
    // console.log(`request.body: ${JSON.stringify(body)}`);

    // Ensure that password is provided
    if (!password) {
      return new NextResponse('Password is required', { status: 400 });
    }

    connectDB()

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new NextResponse('User already exists', { status: 400 });
    }

    // Create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, username, password: hashedPassword, provider: "credentials" });
    await newUser.save();

    return new NextResponse('User registered successfully', { status: 201 });
  } else {
    return new NextResponse('Method Not Allowed', { status: 405 });
  }
}
