// Add the API key to an header object. DO NOT SHARE API KEY
const header = new Headers({
	"x-dune-api-key": process.env.REACT_APP_DUNE_API_KEY,
});

// Add parameters we would pass to the query
var params = {
	query_parameters: {
		wallet_address: "0xE609c9f6687a44eA3a58A035E68CdFe0b63D4196",
	},
};

// Request Body
var body = JSON.stringify(params);

//  Call the Dune API: Execute Query ID
const response = await fetch(
	"https://api.dune.com/api/v1/query/1532273/execute",
	{
		method: "POST",
		headers: header,
		body: body, // This is where we pass the parameters
	}
);

const response_object = await response.json();

// Log the returned response
console.log(response_object);

//  Call the Dune API: Execute results
const execution_id = `https://api.dune.com/api/v1/execution/${response_object.execution_id}/results`;

const query_results = await fetch(execution_id, {
	method: "GET",
	headers: header,
});

const execution_object = await query_results.json();
console.log(execution_object);

// Address book (non-decreasing order according to # of transactions)
for (
	var address_index = 0;
	address_index < execution_object.result.rows.length;
	address_index++
) {
	console.log(
		"Address:        ",
		execution_object.result.rows[address_index].walletid.replace("\\", "0")
	);
	console.log(
		"Frequecy:       ",
		execution_object.result.rows[address_index].transactions
	);
	console.log(
		"Total ETH sent: ",
		execution_object.result.rows[address_index].totaltraded
	);
	console.log("\n");
}
