// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

import "./interfaces/IERC20.sol";

contract W3nPay {

    struct Payment {
        uint id;
        address from;
        address to;
        uint amount;
        string messageId;
        bool paid;
        bool rejected;
        bool canceled;
    }

    uint paymentId;
    mapping(address => Payment[]) private paymentsLookUp;
    
    function addPayment(uint _amount, address _from, address _to, string memory _messageId, bool _paid) public {
        paymentId++;

        Payment memory newPaymentRequest = Payment({
            id: paymentId,
            from: _from,
            to: _to,
            amount: _amount,
            messageId: _messageId,
            paid: _paid,
            rejected: false,
            canceled: false
        });

        paymentsLookUp[msg.sender].push(newPaymentRequest);
    }

    function getTransactions() public view returns (Payment[] memory) {
        return paymentsLookUp[msg.sender];
    }

    function updateRequestStatus(uint _id, bool _paid, bool _rejected, bool _canceled) public {
        Payment[] memory paymentRequests = paymentsLookUp[msg.sender];

        for (uint i = 0; i < paymentRequests.length; i++) {
            if (paymentRequests[i].id == _id) {
                paymentsLookUp[msg.sender][i].paid = _paid;
                paymentsLookUp[msg.sender][i].rejected = _rejected;
                paymentsLookUp[msg.sender][i].canceled = _canceled;
            }
        }
    }

    function transfer(address _token, uint _amount, address _account, string memory _messageId, uint _id) public returns (bool) {
        // Update state
        if (_id != 0) {
            updateRequestStatus(_id, true, false, false);
        } else {
            addPayment(_amount, msg.sender, _account, _messageId, true);
        }
        
        // Transfer tokens
        IERC20(_token).transferFrom(msg.sender, _account, _amount);

        return true;
    }
}