import React from 'react';
import { Button } from "@/components/ui/button";
import { FileText, Receipt } from "lucide-react";

const DocumentTypeSelector = ({ onSelect }) => {
    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
            <section className="w-full max-w-2xl px-2 py-10">
                <div className="mb-8 text-center">
                    <img
                        src="/Screenshot 2026-04-21 190807.png"
                        alt="Evam Event Planners"
                        className="mx-auto mb-6 h-32 w-auto object-contain sm:h-40"
                    />
                    <h1 className="text-3xl font-bold tracking-tight">Select Document Type</h1>
                    <p className="mt-3 text-sm text-muted-foreground">
                        Choose the document you want to create.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <Button
                        variant="outline"
                        className="h-40 flex flex-col gap-4 rounded-lg bg-background"
                        onClick={() => onSelect('estimate')}
                    >
                        <FileText className="h-12 w-12" />
                        <span className="text-lg font-semibold">Estimate</span>
                    </Button>

                    <Button
                        variant="outline"
                        className="h-40 flex flex-col gap-4 rounded-lg bg-background"
                        onClick={() => onSelect('cashbill')}
                    >
                        <Receipt className="h-12 w-12" />
                        <span className="text-lg font-semibold">Cash Bill</span>
                    </Button>
                </div>
            </section>
        </div>
    );
};

export default DocumentTypeSelector;
