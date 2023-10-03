Feature: One Customer One Table Journey

  Scenario: Displaying Menu Category to Customer
    Given the storeId is "6502cb1a99d74f680c854e09", branchId is "6502cb1a99d74f680c854e0c", and tableId is "100"
    When I send GET request to "/menuCategory" with param "store_Id"="6502cb1a99d74f680c854e09"
    Then the response status code should be "200"
    Then I receive "menuCategories.json"

  Scenario: Displaying Menu Item to Customer
    Given the storeId is "6502cb1a99d74f680c854e09", branchId is "6502cb1a99d74f680c854e0c", and tableId is "100"
    When I send GET request to "/menuCategory/6502d85d99d74f680c854e47"
    Then the response status code should be "200"
    Then I receive "menuItemPork.json"