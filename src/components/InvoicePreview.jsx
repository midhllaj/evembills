import React, { forwardRef } from 'react';
import { toWords } from 'number-to-words';

const InvoicePreview = forwardRef(({ data, documentType = 'estimate', theme = 'classic' }, ref) => {
    // Calculate totals
    const total = data.items.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);

    // Convert number to words
    const numberToWords = (num) => {
        const roundedNum = Math.round(num);
        if (roundedNum === 0) return 'ZERO';
        const words = toWords(roundedNum);
        return words.charAt(0).toUpperCase() + words.slice(1);
    };

    // Format date to DD/MM/YYYY
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    // ESTIMATE DESIGN
    if (documentType === 'estimate') {
        return (
            <div className={`evam-page preview-theme-${theme}`} ref={ref} id="invoice-preview">
                {/* Header: Company info left, Logo right */}
                <div className="evam-header">
                    <div className="evam-company-text">EVAM EVENT PLANNERS , GURUVAYUR 9946637535</div>
                    <img src="/Screenshot 2026-04-21 190807.png" alt="Evam Event Planners" className="evam-logo" />
                </div>

                {/* Main bordered container */}
                <div className="evam-main-box">
                    {/* Program Name - underlined */}
                    <div className="evam-program-title">{data.subject || 'INAUGURATION EVENT'}</div>

                    {/* Event Info - column layout (not grid) */}
                    <div className="evam-info-column">
                        <div className="evam-info-row"><em>Date : {formatDate(data.date)}</em></div>
                        <div className="evam-info-row"><em>Venue: {data.venue || '-'}</em></div>
                        <div className="evam-info-row"><em>Time : {data.time || '-'}</em></div>
                        <div className="evam-info-row"><em>Name: {data.company}</em></div>
                    </div>

                    {/* Items Table */}
                    <table className="evam-table">
                        <thead>
                            <tr>
                                <th className="et-sl">No</th>
                                <th className="et-desc">Items</th>
                                <th className="et-amount">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.items.map((item, index) => (
                                <tr key={index}>
                                    <td className="et-sl">{index + 1}</td>
                                    <td className="et-desc">{item.description}</td>
                                    <td className="et-amount">{parseFloat(item.amount || 0).toFixed(2)}</td>
                                </tr>
                            ))}
                            {/* Empty rows after items */}
                            <tr><td className="et-sl">&nbsp;</td><td className="et-desc">&nbsp;</td><td className="et-amount">&nbsp;</td></tr>
                            <tr><td className="et-sl">&nbsp;</td><td className="et-desc">&nbsp;</td><td className="et-amount">&nbsp;</td></tr>
                        </tbody>
                    </table>

                    {/* Total */}
                    <div className="evam-total-section">
                        <div className="evam-total-label">TOTAL AMOUNT</div>
                        <div className="evam-total-value">{total.toFixed(2)}</div>
                    </div>

                    {/* Empty rows after total */}
                    <table className="evam-empty-table">
                        <tbody>
                            <tr><td className="et-sl">&nbsp;</td><td className="et-desc">&nbsp;</td><td className="et-amount">&nbsp;</td></tr>
                            <tr><td className="et-sl">&nbsp;</td><td className="et-desc">&nbsp;</td><td className="et-amount">&nbsp;</td></tr>
                            <tr><td className="et-sl">&nbsp;</td><td className="et-desc">&nbsp;</td><td className="et-amount">&nbsp;</td></tr>
                            <tr><td className="et-sl">&nbsp;</td><td className="et-desc">&nbsp;</td><td className="et-amount">&nbsp;</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    // CASH BILL DESIGN
    return (
        <div className={`cashbill-page preview-theme-${theme}`} ref={ref} id="invoice-preview">
            {/* Header */}
            <div className="cb-header">
                <div className="cb-header-left">
                    <img src="/Screenshot 2026-04-21 190807.png" alt="Evam Event Planners" className="cb-logo" />
                    <div className="cb-company-name">EVAM EVENT PLANNERS</div>
                </div>
                <div className="cb-header-right">
                    <div className="cb-bill-title">BILL</div>
                </div>
            </div>

            {/* Bill Info Section */}
            <div className="cb-info-section">
                <div className="cb-info-left">
                    <div className="cb-info-row">
                        <span className="cb-info-label">Consignee</span>
                        <span className="cb-info-value">{data.company || '-'}</span>
                    </div>
                    <div className="cb-info-row">
                        <span className="cb-info-label"></span>
                        <span className="cb-info-value cb-address">{data.poBox || '-'}</span>
                    </div>
                </div>
                <div className="cb-info-right">
                    <div className="cb-info-row">
                        <span className="cb-info-label">BILL No:</span>
                        <span className="cb-info-value">{data.quoteNo || '-'}</span>
                    </div>
                    <div className="cb-info-row">
                        <span className="cb-info-label">Dated:</span>
                        <span className="cb-info-value">{formatDate(data.date)}</span>
                    </div>
                    <div className="cb-info-row">
                        <span className="cb-info-label">Buyers Order No:</span>
                        <span className="cb-info-value">{data.buyerOrderNo || '-'}</span>
                    </div>
                    <div className="cb-info-row">
                        <span className="cb-info-label">Destination</span>
                        <span className="cb-info-value">{data.venue || '-'}</span>
                    </div>
                    <div className="cb-info-row">
                        <span className="cb-info-label">Despatched through</span>
                        <span className="cb-info-value">{data.dispatch || '-'}</span>
                    </div>
                    <div className="cb-info-row">
                        <span className="cb-info-label">Terms of Delivery</span>
                        <span className="cb-info-value">{data.terms || '-'}</span>
                    </div>
                </div>
            </div>

            {/* Particulars Table */}
            <table className="cb-table">
                <thead>
                    <tr>
                        <th className="cbt-no">no</th>
                        <th className="cbt-particulars">Particulers</th>
                        <th className="cbt-amount">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {data.items.map((item, index) => (
                        <tr key={index}>
                            <td className="cbt-no">{index + 1}</td>
                            <td className="cbt-particulars">{item.description}</td>
                            <td className="cbt-amount">{parseFloat(item.amount || 0).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Total Section */}
            <div className="cb-total-section">
                <div className="cb-amount-words">
                    Rupees {numberToWords(total)} ONLY
                </div>
                <div className="cb-total-amount">
                    <span className="cb-total-label">TOTAL PACKAGE AMOUNT</span>
                    <span className="cb-total-value">{total.toFixed(2)}</span>
                </div>
            </div>

            {/* Footer */}
            <div className="cb-footer">
                <div className="cb-footer-left">
                    <div className="cb-declaration">
                        Declaration: We declare that this invoice shows the actual<br />
                        price of the goods described and that all particulars are true and correct
                    </div>
                    <div className="cb-reg-info">
                        <div>Registration No: {data.regNo || '-'}</div>
                        <div>PAN No: {data.panNo || 'LCTPS7110M'}</div>
                    </div>
                </div>
                <div className="cb-footer-right">
                    <div className="cb-signature">
                        for Evam Event Planners
                    </div>
                    <div className="cb-sign-line">Authorised Signatory</div>
                </div>
            </div>
        </div>
    );
});

export default InvoicePreview;
