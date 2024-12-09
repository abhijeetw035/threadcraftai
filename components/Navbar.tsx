"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
    SignInButton,
    SignUpButton,
    UserButton,
    SignedOut,
    SignedIn,
    useAuth,
  } from "@clerk/nextjs";