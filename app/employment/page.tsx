"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { toast } from "sonner";
import { useEmployment } from "./useJob";

export default function EmploymentPage() {
    
    useEmployment();

    return (
            <h1>123</h1>
    );
}