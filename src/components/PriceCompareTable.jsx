import React from 'react';

const PriceCompareTable = ({ comparisons, predictions, showAi }) => {
  if (!comparisons || comparisons.length === 0) {
    return <div className="text-center py-8 text-muted">No price comparison data available.</div>;
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Platform</th>
            <th>Delivery Estimate</th>
            <th>Base Price</th>
            <th>Discount</th>
            <th>Final Price</th>
            {showAi && <th className="text-secondary">AI Prediction</th>}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {comparisons.map((comp) => {
            const prediction = predictions?.find(p => p.platform_name === comp.platformName);
            
            return (
              <tr key={comp.id || comp.platformName} className={comp.isCheapest ? "row-highlight" : ""}>
                <td style={{ fontWeight: 500 }}>
                  <div className="flex items-center gap-2">
                    {comp.platformName}
                    {comp.isCheapest && <span className="badge badge-success">Cheapest</span>}
                    {!comp.inStock && <span className="badge badge-danger">Out of Stock</span>}
                  </div>
                </td>
                <td>
                  <div>{comp.deliveryDays} Days</div>
                  <div className="text-muted" style={{ fontSize: '0.8rem' }}>{comp.deliveryNote}</div>
                </td>
                <td style={{ textDecoration: comp.discountPercent > 0 ? 'line-through' : 'none', color: comp.discountPercent > 0 ? 'var(--text-muted)' : 'inherit' }}>
                  ${comp.price?.toFixed(2)}
                </td>
                <td className="text-success">
                  {comp.discountPercent > 0 ? `${comp.discountPercent}% OFF` : '-'}
                </td>
                <td style={{ fontWeight: 700, fontSize: '1.1rem' }}>
                  ${(comp.discountedPrice || comp.price)?.toFixed(2)}
                </td>
                
                {showAi && (
                  <td style={{ background: 'rgba(236, 72, 153, 0.05)' }}>
                    {prediction ? (
                      <div>
                        <div className="text-secondary" style={{ fontWeight: 'bold' }}>
                          ${prediction.predicted_price?.toFixed(2)}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {prediction.confidence}% conf.
                        </div>
                      </div>
                    ) : (
                      <span className="text-muted text-sm">N/A</span>
                    )}
                  </td>
                )}
                
                <td>
                  <a href={comp.buyUrl || '#'} target="_blank" rel="noopener noreferrer" className={`btn ${comp.inStock ? 'btn-primary' : 'btn-outline'}`} style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem' }} aria-disabled={!comp.inStock} onClick={e => !comp.inStock && e.preventDefault()}>
                    {comp.inStock ? 'Buy Now' : 'Check Site'}
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PriceCompareTable;
