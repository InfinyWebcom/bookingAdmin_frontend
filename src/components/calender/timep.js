

export default function Timejs()  {
  
  const monthsArray = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]; 
  
  const quantity = { January: [ { name: "selva", loc_name: "Trichy", comm_name: "Batteries", quantity: "435", reportdate: "2022-01" }, { name: "selva", loc_name: "Trichy", comm_name: "Batteries", quantity: "54", reportdate: "2022-01" }, { name: "selva", loc_name: "Trichy", comm_name: "Batteries", quantity: "67.78", reportdate: "2022-01" } ], February: [ { name: "selva", loc_name: "Trichy", comm_name: "Batteries", quantity: "54", reportdate: "2022-02" }, { name: "selva", loc_name: "Trichy", comm_name: "Batteries", quantity: "67", reportdate: "2022-02" }, { name: "selva", loc_name: "Trichy", comm_name: "Batteries", quantity: "78", reportdate: "2022-02" } ] };

  const convertedData = Object.entries(quantity).reduce(
    // get month and its arr in the initial data object 
    (prev, [month, dataArr]) => {
      // get the month index 
      const dataIndex = monthsArray.indexOf(month.substring(0, 3));
      dataArr.forEach(({ comm_name, quantity }) => {
        if (!prev[comm_name]) {
          // comm_name does not has intialized yet. create an empty array with 12 empty strings (for 12 months)
          prev[comm_name] = new Array(12).fill("");;
        }
        // assign quantity to the array where index is the month
        prev[comm_name][dataIndex] = quantity;
      });
      return prev;
    },
    {}
  );

  return (
    <table>
      <thead>
        <tr>
          <th>Commodity Name</th>
          {monthsArray.map((month) => (
            <th>{month}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Object.entries(convertedData).map(([comm_name, dataArr]) => (
          <tr>
            <td>{comm_name}</td>
            {dataArr.map((qty) => (
              <td>{qty}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}