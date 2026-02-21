function ReuseTable({data, columns}){
    return(
        <div>
            <table border={2} cellPadding={8} style={{ textAlign: "center" }}>
            <thead>
                <tr>
                {columns.map((col) => (
                    <th key={col.id}>{col.header}</th>
                ))}
                </tr>
            </thead>

            <tbody>
                {data.map((row) => (
                <tr key={row.id}>
                    {columns.map((col) => (
                    <td key={col.id}>{row[col.items]}</td>
                    ))}
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    )
}