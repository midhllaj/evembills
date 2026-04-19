import React, { forwardRef } from 'react';
import { toWords } from 'number-to-words';

const InvoicePreview = forwardRef(({ data, documentType = 'quotation' }, ref) => {
    // Calculate totals
    const total = data.items.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
    const gstRate = data.gstRate || 5;
    const gst = data.vatEnabled ? total * (gstRate / 100) : 0;
    const grossTotal = total + gst;

    // Convert number to words
    const numberToWords = (num) => {
        const roundedNum = Math.round(num);
        if (roundedNum === 0) return 'ZERO';
        const words = toWords(roundedNum);
        return words.toUpperCase();
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

    const documentTitle = documentType === 'invoice' ? 'INVOICE' : 'QUOTATION';

    return (
        <div className="univent-page" ref={ref} id="invoice-preview">

            {/* ── LEFT BLUE BORDER STRIP ── */}
            <div className="univent-left-strip" />

            {/* ── WATERMARK (centered faded butterfly) ── */}
            <div className="univent-watermark">
                <img src="/Amal 2.png" alt="" />
            </div>

            {/* ══════════════ HEADER ══════════════ */}
            <div className="univent-header">
                {/* Left: Document Title */}
                <div className="univent-doc-title">{documentTitle}</div>

                {/* Right: Logo + Company Info */}
                <div className="univent-company-block">
                    <img src="/Amal 2.png" alt="Univent Logo" className="univent-top-logo" />
                    <div className="univent-tagline">EVENT MANAGEMENT, PROGRAMME AGENCY &amp; TOURS PLANNER</div>
                    <div className="univent-affil">Affiliated to Kerala Sangeetha Nataka Acadamy</div>
                    <div className="univent-affil">Member of Professional Programme Association Federation Trivandrum ®</div>
                </div>
            </div>

            {/* Double separator below header */}
            <div className="univent-double-line" />

            {/* ══════════════ CLIENT INFO GRID ══════════════ */}
            <div className="univent-info-grid">
                <div className="uig-cell uig-label">{documentType === 'invoice' ? 'Invoice No' : 'Quote No'}</div>
                <div className="uig-cell">{data.quoteNo}</div>
                <div className="uig-cell uig-label">Date</div>
                <div className="uig-cell">{formatDate(data.date)}</div>

                <div className="uig-cell uig-label">Client Name</div>
                <div className="uig-cell" style={{ gridColumn: 'span 3' }}>{data.company}</div>

                <div className="uig-cell uig-label">Address</div>
                <div className="uig-cell" style={{ gridColumn: 'span 3' }}>{data.poBox}</div>

                <div className="uig-cell uig-label">Subject</div>
                <div className="uig-cell" style={{ gridColumn: 'span 3' }}>{data.subject}</div>
            </div>

            {/* ══════════════ ITEMS TABLE ══════════════ */}
            <table className="univent-table">
                <thead>
                    <tr>
                        <th className="ut-sl">Sl.<br />No.</th>
                        <th className="ut-desc">Description</th>
                        <th className="ut-qty">Qty</th>
                        <th className="ut-price">Unit<br />Price</th>
                        <th className="ut-amount">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {data.items.map((item, index) => (
                        <tr key={index} style={{ height: '48px' }}>
                            <td className="ut-sl">{index + 1}.</td>
                            <td className="ut-desc" style={{ whiteSpace: 'pre-wrap' }}>{item.description}</td>
                            <td className="ut-qty">{item.quantity}</td>
                            <td className="ut-price">{item.unitPrice}</td>
                            <td className="ut-amount">{item.amount}</td>
                        </tr>
                    ))}
                    {Array.from({ length: Math.max(0, 8 - data.items.length) }).map((_, i) => (
                        <tr key={`empty-${i}`} style={{ height: '48px' }}>
                            <td className="ut-sl"></td>
                            <td className="ut-desc"></td>
                            <td className="ut-qty"></td>
                            <td className="ut-price"></td>
                            <td className="ut-amount"></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* ══════════════ TOTALS ══════════════ */}
            <table className="univent-totals">
                <tbody>
                    <tr>
                        <td rowSpan={data.vatEnabled ? 3 : 2} className="ut-words-cell">
                            <div className="ut-amount-words">
                                <strong>Amount in Words (INR):</strong><br />
                                {numberToWords(grossTotal)} ONLY/-
                            </div>
                            {documentType === 'quotation' && (
                                <div className="ut-payment-terms">
                                    <strong>PAYMENT: ADVANCE PAYMENT</strong><br />
                                    FOR THE BEST QUALITY AND SERVICE, NOW AND ALWAYS
                                </div>
                            )}
                        </td>
                        <td className="ut-total-label">TOTAL ( INR )</td>
                        <td className="ut-total-value">{total.toFixed(2)}/-</td>
                    </tr>
                    {data.vatEnabled && (
                        <tr>
                            <td className="ut-total-label">GST ( {gstRate}% )</td>
                            <td className="ut-total-value">{gst > 0 ? gst.toFixed(2) : '-'}</td>
                        </tr>
                    )}
                    <tr>
                        <td className="ut-total-label ut-gross">GROSS TOTAL ( INR )</td>
                        <td className="ut-total-value ut-gross">{grossTotal.toFixed(2)}/-</td>
                    </tr>
                </tbody>
            </table>

            {/* ══════════════ SIGNATURE ══════════════ */}
            <div className="univent-signature-row">
                <div className="univent-signature">
                    <p>Director</p>
                    <p><strong>Amal Prasad</strong></p>
                </div>
            </div>

            {/* ══════════════ FOOTER ══════════════ */}
            <div className="univent-footer-wrap">
                {/* Double separator above footer */}
                <div className="univent-double-line" />

                <div className="univent-footer">
                    {/* Address */}
                    <div className="uf-address">
                        Tenco Centre, 2nd Floor, Puthiyatheru, P.O.Chirakkal, Kannur, Kerala- 670-011
                    </div>

                    {/* Phone */}
                    <div className="uf-phone">
                        <span className="uf-phone-icon">📞</span>
                        +91 9400 987 222 &nbsp;,&nbsp; +91 8129 294 601 &nbsp;,&nbsp; +91 9061 459 552
                    </div>

                    {/* Social / Web links */}
                    <div className="uf-social">
                        <span className="uf-social-item">🌐 www.univent.net.in</span>
                        <span className="uf-dot">■</span>
                        <span className="uf-social-item">✉ univentonline@gmail.com</span>
                        <span className="uf-dot">■</span>
                        <span className="uf-social-item">f Univent Event Management &amp; Tours Planner</span>
                        <span className="uf-dot">■</span>
                        <span className="uf-social-item">𝕏 Univent</span>
                    </div>
                </div>
            </div>

        </div>
    );
});

export default InvoicePreview;
