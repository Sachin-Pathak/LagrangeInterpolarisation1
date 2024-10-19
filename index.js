function decodeValue(base, value) {
    // Convert value from the specified base to BigInt
    if (base === 16) {
      return BigInt("0x" + value); // Handle hexadecimal conversion
    } else if (base === 15) {
      return BigInt(parseInt(value, 15)); // Convert from base 15
    } else if (base === 8) {
      return BigInt(parseInt(value, 8)); // Convert from octal
    } else if (base === 3) {
      return BigInt(parseInt(value, 3)); // Convert from base 3
    } else {
      // For other bases, convert to base 10 first and then to BigInt
      return BigInt(parseInt(value, base));
    }
  }
function lagrangeInterpolation(xValues, yValues) {
    const k = xValues.length;
    let c = BigInt(0);

    for (let i = 0; i < k; i++) {
        const xi = xValues[i];
        const yi = yValues[i];
        let li = BigInt(1);

        for (let j = 0; j < k; j++) {
            if (i !== j) {
                li *= (BigInt(0) - xValues[j]) / (xi - xValues[j]);
            }
        }
        c += li * yi;
    }
    
    return c;
}

function main() {
    const inputJson = `{
        "keys": {
            "n": 10,
            "k": 7
        },
        "1": {
            "base": "6",
            "value": "13444211440455345511"
        },
        "2": {
            "base": "15",
            "value": "aed7015a346d63"
        },
        "3": {
            "base": "15",
            "value": "6aeeb69631c227c"
        },
        "4": {
            "base": "16",
            "value": "e1b5e05623d881f"
        },
        "5": {
            "base": "8",
            "value": "316034514573652620673"
        },
        "6": {
            "base": "3",
            "value": "2122212201122002221120200210011020220200"
        },
        "7": {
            "base": "3",
            "value": "20120221122211000100210021102001201112121"
        },
        "8": {
            "base": "6",
            "value": "20220554335330240002224253"
        },
        "9": {
            "base": "12",
            "value": "45153788322a1255483"
        },
        "10": {
            "base": "7",
            "value": "1101613130313526312514143"
        }
    }`;

    const data = JSON.parse(inputJson);
    
    const n = data.keys.n;
    const k = data.keys.k;
    
    const xValues = [];
    const yValues = [];
    
    for (let key = 1; key <= n; key++) {
        const base = parseInt(data[key.toString()].base);
        const value = data[key.toString()].value;
        
        // Decode y value
        const yDecoded = decodeValue(base, value);
        
        // Use key as x value
        xValues.push(BigInt(key));
        yValues.push(yDecoded);
    }
    
    // Calculate constant term c using Lagrange interpolation
    const c = lagrangeInterpolation(xValues.slice(0, k), yValues.slice(0, k));
    
    console.log("The constant term c of the polynomial is:", c.toString());
}

// Run the main function
main();