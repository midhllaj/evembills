import React, { forwardRef } from 'react';
import { toWords } from 'number-to-words';

const InvoicePreview = forwardRef(({ data, documentType = 'estimate', theme = 'classic' }, ref) => {
    // Calculate totals
    const total = data.items.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
    const advanceAmount = parseFloat(data.advanceAmount) || 0;
    const gstRate = parseFloat(data.gstRate) || 0;
    const gstAmount = data.vatEnabled ? (total * gstRate) / 100 : 0;
    const grossTotal = total + gstAmount;
    const balanceAmount = Math.max(grossTotal - advanceAmount, 0);
    const hasAdvanceAmount = advanceAmount > 0;

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

    if (theme === 'letterhead') {
        const heading = documentType === 'estimate' ? 'ESTIMATE' : 'CASH BILL';
        const referenceLabel = documentType === 'estimate' ? 'Estimate No' : 'Bill No';
        const clientLabel = documentType === 'estimate' ? 'Client Name' : 'Consignee';
        const address = documentType === 'estimate' ? data.venue : data.poBox;
        const subject = documentType === 'estimate' ? data.subject : data.venue;
        const itemRows = data.items.length > 0 ? data.items : [{ description: '', quantity: '', unitPrice: '', amount: '' }];
        const emptyRows = Array.from({ length: Math.max(0, 9 - itemRows.length) });

        return (
            <div className="letterhead-page" ref={ref} id="invoice-preview">
                <div className="letterhead-header">
                    <div className="letterhead-title">{heading}</div>
                    <div className="letterhead-brand">
                        <img src="/Screenshot 2026-04-21 190807.png" alt="Evam Event Planners" className="letterhead-logo" />
                        <div className="letterhead-tagline">EVAM EVENT PLANNERS</div>
                        <div className="letterhead-contact">Guruvayur | 9946637535</div>
                    </div>
                </div>

                <table className="letterhead-info-table">
                    <tbody>
                        <tr>
                            <th>{referenceLabel}</th>
                            <td>{data.quoteNo || '-'}</td>
                            <th>Date</th>
                            <td>{formatDate(data.date)}</td>
                        </tr>
                        <tr>
                            <th>{clientLabel}</th>
                            <td colSpan="3">{data.company || '-'}</td>
                        </tr>
                        <tr>
                            <th>Address</th>
                            <td colSpan="3">{address || '-'}</td>
                        </tr>
                        <tr>
                            <th>Subject</th>
                            <td colSpan="3">{subject || '-'}</td>
                        </tr>
                    </tbody>
                </table>

                <table className="letterhead-items-table">
                    <thead>
                        <tr>
                            <th className="lht-sl">Sl. No.</th>
                            <th className="lht-description">Description</th>
                            <th className="lht-qty">Qty</th>
                            <th className="lht-rate">Unit Price</th>
                            <th className="lht-amount">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itemRows.map((item, index) => (
                            <tr key={index}>
                                <td className="lht-sl">{index + 1}</td>
                                <td className="lht-description">{item.description}</td>
                                <td className="lht-qty">{item.quantity || ''}</td>
                                <td className="lht-rate">{item.unitPrice ? parseFloat(item.unitPrice).toFixed(2) : ''}</td>
                                <td className="lht-amount">{parseFloat(item.amount || 0).toFixed(2)}</td>
                            </tr>
                        ))}
                        {emptyRows.map((_, index) => (
                            <tr key={`empty-${index}`}>
                                <td className="lht-sl">&nbsp;</td>
                                <td className="lht-description">&nbsp;</td>
                                <td className="lht-qty">&nbsp;</td>
                                <td className="lht-rate">&nbsp;</td>
                                <td className="lht-amount">&nbsp;</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="letterhead-summary">
                    <div className="letterhead-words">
                        <strong>Amount in Words (INR):</strong>
                        <span>{numberToWords(documentType === 'cashbill' ? balanceAmount : grossTotal)} ONLY.</span>
                    </div>
                    <div className="letterhead-totals">
                        <div><span>TOTAL (INR)</span><strong>{total.toFixed(2)}</strong></div>
                        {data.vatEnabled && (
                            <div><span>GST ({gstRate}%)</span><strong>{gstAmount.toFixed(2)}</strong></div>
                        )}
                        {documentType === 'estimate' && hasAdvanceAmount && (
                            <div><span>ADVANCE TO PAY (INR)</span><strong>{advanceAmount.toFixed(2)}</strong></div>
                        )}
                        {documentType === 'cashbill' && hasAdvanceAmount && (
                            <div><span>LESS: ADVANCE RECEIVED (INR)</span><strong>{advanceAmount.toFixed(2)}</strong></div>
                        )}
                        <div className="letterhead-grand">
                            <span>{documentType === 'cashbill' ? 'BALANCE TOTAL (INR)' : 'GROSS TOTAL (INR)'}</span>
                            <strong>{(documentType === 'cashbill' ? balanceAmount : grossTotal).toFixed(2)}</strong>
                        </div>
                    </div>
                </div>

                <div className="letterhead-payment">
                    {documentType === 'estimate' ? (
                        <>
                            PAYMENT: ADVANCE PAYMENT{hasAdvanceAmount ? ` INR ${advanceAmount.toFixed(2)}` : ''}<br />
                            FOR THE BEST QUALITY AND SERVICE, NOW AND ALWAYS
                        </>
                    ) : (
                        <>
                            Declaration: We declare that this bill shows the actual amount<br />
                            and that all particulars are true and correct.
                        </>
                    )}
                </div>

                <div className="letterhead-signature">
                    <span>Director</span>
                    <strong>Evam Event Planners</strong>
                </div>

                <div className="letterhead-footer">
                    <div>Guruvayur, Kerala</div>
                    <div>9946637535</div>
                </div>
            </div>
        );
    }

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
                    <div className="evam-total-section evam-total-stack">
                        <div className="evam-total-row">
                            <div className="evam-total-label">TOTAL AMOUNT</div>
                            <div className="evam-total-value">{total.toFixed(2)}</div>
                        </div>
                        {data.vatEnabled && (
                            <>
                                <div className="evam-total-row">
                                    <div className="evam-total-label">GST ({gstRate}%)</div>
                                    <div className="evam-total-value">{gstAmount.toFixed(2)}</div>
                                </div>
                                <div className="evam-total-row evam-gross-row">
                                    <div className="evam-total-label">GROSS TOTAL</div>
                                    <div className="evam-total-value">{grossTotal.toFixed(2)}</div>
                                </div>
                            </>
                        )}
                        {hasAdvanceAmount && (
                            <div className="evam-total-row evam-advance-row">
                                <div className="evam-total-label">ADVANCE TO PAY</div>
                                <div className="evam-total-value">{advanceAmount.toFixed(2)}</div>
                            </div>
                        )}
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
                    Rupees {numberToWords(balanceAmount)} ONLY
                </div>
                <div className="cb-total-amount">
                    <span className="cb-total-label">TOTAL PACKAGE AMOUNT</span>
                    <span className="cb-total-value">{total.toFixed(2)}</span>
                </div>
                {data.vatEnabled && (
                    <>
                        <div className="cb-total-amount cb-adjustment-amount">
                            <span className="cb-total-label">GST ({gstRate}%)</span>
                            <span className="cb-total-value">{gstAmount.toFixed(2)}</span>
                        </div>
                        <div className="cb-total-amount">
                            <span className="cb-total-label">GROSS TOTAL</span>
                            <span className="cb-total-value">{grossTotal.toFixed(2)}</span>
                        </div>
                    </>
                )}
                {hasAdvanceAmount && (
                    <>
                        <div className="cb-total-amount cb-adjustment-amount">
                            <span className="cb-total-label">LESS: ADVANCE RECEIVED</span>
                            <span className="cb-total-value">-{advanceAmount.toFixed(2)}</span>
                        </div>
                        <div className="cb-total-amount cb-balance-amount">
                            <span className="cb-total-label">BALANCE TOTAL</span>
                            <span className="cb-total-value">{balanceAmount.toFixed(2)}</span>
                        </div>
                    </>
                )}
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
