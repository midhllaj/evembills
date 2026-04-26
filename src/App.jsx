import React, { useState } from 'react';
import InvoiceForm from './components/InvoiceForm';
import PreviewModal from './components/PreviewModal';
import DocumentTypeSelector from './components/DocumentTypeSelector';
import './App.css';

function App() {
  const [showTypeSelector, setShowTypeSelector] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [documentType, setDocumentType] = useState('');
  const [invoiceData, setInvoiceData] = useState({
    quoteNo: '',
    date: new Date().toISOString().split('T')[0],
    company: '',
    trn: '',
    poBox: '',
    attention: '',
    subject: '',
    vatEnabled: false,
    gstRate: 5,
    venue: '',
    time: '',
    buyerOrderNo: '',
    dispatch: '',
    terms: '',
    regNo: '',
    panNo: '',
    items: []
  });

  const handleChange = (field, value) => {
    setInvoiceData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddItem = () => {
    setInvoiceData(prev => ({
      ...prev,
      items: [
        ...prev.items,
        { description: '', quantity: 1, unitPrice: '', amount: '' }
      ]
    }));
  };

  const handleRemoveItem = (index) => {
    setInvoiceData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const handleDocumentTypeSelect = (type) => {
    setDocumentType(type);
    setShowTypeSelector(false);
  };

  const handleBackToDocumentTypes = () => {
    setShowPreview(false);
    setDocumentType('');
    setShowTypeSelector(true);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-5xl">
        {documentType && (
          <InvoiceForm
            data={invoiceData}
            onChange={handleChange}
            onAddItem={handleAddItem}
            onRemoveItem={handleRemoveItem}
            onPreview={() => setShowPreview(true)}
            onDownload={() => setShowPreview(true)}
            onBack={handleBackToDocumentTypes}
            documentType={documentType}
          />
        )}

        {showTypeSelector && (
          <DocumentTypeSelector
            onSelect={handleDocumentTypeSelect}
            onClose={() => setShowTypeSelector(false)}
          />
        )}

        {showPreview && (
          <PreviewModal
            data={invoiceData}
            documentType={documentType}
            onClose={() => setShowPreview(false)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
