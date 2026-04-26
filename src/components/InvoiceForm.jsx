import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, FileText, Download, ArrowLeft } from "lucide-react";

const InvoiceForm = ({ data, onChange, onAddItem, onRemoveItem, onPreview, onDownload, onBack, documentType }) => {
    const handleItemChange = (index, field, value) => {
        const newItems = [...data.items];
        newItems[index][field] = value;
        onChange('items', newItems);
    };

    return (
        <div className="space-y-6 p-1">
            <div className="flex flex-col-reverse md:flex-row items-center md:items-start justify-between gap-6 md:gap-4">
                {/* Left: Title + Controls */}
                <div className="flex flex-col gap-4 flex-1 w-full text-center md:text-left">
                    <div className="flex justify-center md:justify-start">
                        <Button variant="ghost" onClick={onBack} className="px-2">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back
                        </Button>
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight">
                        {documentType === 'estimate' ? 'Estimate Generator' : 'Cash Bill Generator'}
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-3 flex-wrap justify-center md:justify-start items-center md:items-start">
                        <div className="flex gap-2 justify-center md:justify-start w-full sm:w-auto">
                            <Button variant="outline" onClick={onPreview} className="flex-1 sm:flex-none">
                                <FileText className="mr-2 h-4 w-4" /> Preview
                            </Button>
                            <Button onClick={onDownload} className="flex-1 sm:flex-none">
                                <Download className="mr-2 h-4 w-4" /> Download
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Right: Logo */}
                <img src="/Screenshot 2026-04-21 190807.png" alt="Evam Event Planners" className="h-28 object-contain shrink-0" />
            </div>

            {/* ESTIMATE FORM FIELDS */}
            {documentType === 'estimate' && (
                <>
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Event Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="date">Date</Label>
                                        <Input
                                            id="date"
                                            type="date"
                                            value={data.date}
                                            onChange={(e) => onChange('date', e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="venue">Venue</Label>
                                        <Input
                                            id="venue"
                                            value={data.venue || ''}
                                            onChange={(e) => onChange('venue', e.target.value)}
                                            placeholder="e.g., kunnamkulam"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="time">Time</Label>
                                        <Input
                                            id="time"
                                            value={data.time || ''}
                                            onChange={(e) => onChange('time', e.target.value)}
                                            placeholder="e.g., MORNING"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="subject">Program Name</Label>
                                        <Input
                                            id="subject"
                                            value={data.subject}
                                            onChange={(e) => onChange('subject', e.target.value)}
                                            placeholder="e.g., INAUGURATION EVENT"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Client Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="company">Client Name</Label>
                                    <Input
                                        id="company"
                                        value={data.company}
                                        onChange={(e) => onChange('company', e.target.value)}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle>Line Items</CardTitle>
                            <Button variant="secondary" size="sm" onClick={onAddItem}>
                                <Plus className="mr-2 h-4 w-4" /> Add Item
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {data.items.map((item, index) => (
                                    <div key={index} className="flex flex-col md:flex-row gap-4 items-start border-b md:border-b-0 pb-4 md:pb-0 last:border-0">
                                        <div className="flex-1 space-y-2 w-full">
                                            <Label className="md:hidden">Description</Label>
                                            {index === 0 && <Label className="hidden md:block">Description</Label>}
                                            <Textarea
                                                placeholder="Description"
                                                value={item.description}
                                                onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                                                className="resize-y"
                                            />
                                        </div>
                                        <div className="flex gap-2 w-full md:w-auto">
                                            <div className="flex-1 md:w-32 space-y-2">
                                                <Label className="md:hidden">Amount</Label>
                                                {index === 0 && <Label className="hidden md:block">Amount</Label>}
                                                <Input
                                                    type="number"
                                                    placeholder="Amount"
                                                    value={item.amount}
                                                    onChange={(e) => handleItemChange(index, 'amount', e.target.value)}
                                                />
                                            </div>
                                            <div className={`pt-8 md:pt-0 ${index === 0 ? "md:pt-8" : ""}`}>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                                                    onClick={() => onRemoveItem(index)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </>
            )}

            {/* CASH BILL FORM FIELDS */}
            {documentType === 'cashbill' && (
                <>
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Bill Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="quoteNo">Bill No</Label>
                                        <Input
                                            id="quoteNo"
                                            value={data.quoteNo}
                                            onChange={(e) => onChange('quoteNo', e.target.value)}
                                            placeholder="e.g., 1097"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="date">Date</Label>
                                        <Input
                                            id="date"
                                            type="date"
                                            value={data.date}
                                            onChange={(e) => onChange('date', e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="buyerOrderNo">Buyers Order No</Label>
                                        <Input
                                            id="buyerOrderNo"
                                            value={data.buyerOrderNo || ''}
                                            onChange={(e) => onChange('buyerOrderNo', e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="venue">Destination</Label>
                                        <Input
                                            id="venue"
                                            value={data.venue || ''}
                                            onChange={(e) => onChange('venue', e.target.value)}
                                            placeholder="e.g., kunnamkulam"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="dispatch">Despatched Through</Label>
                                        <Input
                                            id="dispatch"
                                            value={data.dispatch || ''}
                                            onChange={(e) => onChange('dispatch', e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="terms">Terms of Delivery</Label>
                                        <Input
                                            id="terms"
                                            value={data.terms || ''}
                                            onChange={(e) => onChange('terms', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Consignee Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="company">Consignee Name</Label>
                                    <Input
                                        id="company"
                                        value={data.company}
                                        onChange={(e) => onChange('company', e.target.value)}
                                        placeholder="e.g., IDBI BANK KUNNAMKULAM"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="poBox">Address</Label>
                                    <Textarea
                                        id="poBox"
                                        value={data.poBox}
                                        onChange={(e) => onChange('poBox', e.target.value)}
                                        placeholder="Full address"
                                        className="resize-y"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="regNo">Registration No</Label>
                                        <Input
                                            id="regNo"
                                            value={data.regNo || ''}
                                            onChange={(e) => onChange('regNo', e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="panNo">PAN No</Label>
                                        <Input
                                            id="panNo"
                                            value={data.panNo || ''}
                                            onChange={(e) => onChange('panNo', e.target.value)}
                                            placeholder="LCTPS7110M"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle>Particulars</CardTitle>
                            <Button variant="secondary" size="sm" onClick={onAddItem}>
                                <Plus className="mr-2 h-4 w-4" /> Add Item
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {data.items.map((item, index) => (
                                    <div key={index} className="flex flex-col md:flex-row gap-4 items-start border-b md:border-b-0 pb-4 md:pb-0 last:border-0">
                                        <div className="flex-1 space-y-2 w-full">
                                            <Label className="md:hidden">Description</Label>
                                            {index === 0 && <Label className="hidden md:block">Particulars</Label>}
                                            <Textarea
                                                placeholder="Description"
                                                value={item.description}
                                                onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                                                className="resize-y"
                                            />
                                        </div>
                                        <div className="flex gap-2 w-full md:w-auto">
                                            <div className="flex-1 md:w-32 space-y-2">
                                                <Label className="md:hidden">Amount</Label>
                                                {index === 0 && <Label className="hidden md:block">Amount</Label>}
                                                <Input
                                                    type="number"
                                                    placeholder="Amount"
                                                    value={item.amount}
                                                    onChange={(e) => handleItemChange(index, 'amount', e.target.value)}
                                                />
                                            </div>
                                            <div className={`pt-8 md:pt-0 ${index === 0 ? "md:pt-8" : ""}`}>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                                                    onClick={() => onRemoveItem(index)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </>
            )}
        </div>
    );
};

export default InvoiceForm;
