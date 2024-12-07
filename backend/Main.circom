pragma circom 2.0.0;

include "node_modules/circomlib/circuits/poseidon.circom";
include "node_modules/circomlib/circuits/bitify.circom";
include "node_modules/circomlib/circuits/comparators.circom";

template AddressVerifier() {
    // Public inputs
    signal input address; // Address as array of bits
    signal input expectedAddress; // Expected address as field element
    
    /*
    // Convert address bits to field element
    component bits2Num = Bits2Num(160);
    for (var i = 0; i < 160; i++) {
        bits2Num.in[i] <== address[i];
    }
    
    // Compare computed address with expected address
    component isEqual = IsEqual();
    isEqual.in[0] <== bits2Num.out;
    isEqual.in[1] <== expectedAddress;
    
    // Enforce equality
    isEqual.out === 1;
    */
    address === expectedAddress;
}

component main = AddressVerifier();