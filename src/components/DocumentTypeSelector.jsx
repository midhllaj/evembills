import React from 'react';
import { Button } from "@/components/ui/button";
import { FileText, Receipt } from "lucide-react";

const DocumentTypeSelector = ({ onSelect, onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={onClose}>
            <div className="relative w-full max-w-md bg-background rounded-lg shadow-lg p-6" onClick={e => e.stopPropagation()}>
                <h2 className="text-xl font-semibold mb-4 text-center">Select Document Type</h2>
                <p className="text-sm text-muted-foreground mb-6 text-center">
                    Choose the type of document you want to preview
                </p>

                <div className="grid grid-cols-2 gap-4">
                    <Button
                        variant="outline"
                        className="h-32 flex flex-col gap-3"
                        onClick={() => onSelect('estimate')}
                    >
                        <FileText className="h-12 w-12" />
                        <span className="text-lg font-semibold">Estimate</span>
                    </Button>

                    <Button
                        variant="outline"
                        className="h-32 flex flex-col gap-3"
                        onClick={() => onSelect('cashbill')}
                    >
                        <Receipt className="h-12 w-12" />
                        <span className="text-lg font-semibold">Cash Bill</span>
                    </Button>
                </div>

                <Button
                    variant="ghost"
                    className="w-full mt-4"
                    onClick={onClose}
                >
                    Cancel
                </Button>
            </div>
        </div>
    );
};

export default DocumentTypeSelector;
