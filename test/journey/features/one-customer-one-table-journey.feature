Feature: One Customer One Table Journey

  3rd page
  Scenario: Displaying Menu Category to Customer
    Given the storeId is "6502cb1a99d74f680c854e09", branchId is "6502cb1a99d74f680c854e0c", and tableId is "100"
    When I send GET request to "/menuCategory" with param "store_Id"="6502cb1a99d74f680c854e09"
    Then the response status code should be "200"
    Then I receive "_1menuCategories.json"

  # 4th page - Pork Selected
  Scenario: Displaying Menu Item
    Given the storeId is "6502cb1a99d74f680c854e09", branchId is "6502cb1a99d74f680c854e0c", and tableId is "100"
    When I send GET request to "/menuCategory/6502d85d99d74f680c854e47"
    Then the response status code should be "200"
    Then I receive "_2menuItemPork.json"

  # 5th page Lechon Kawali selected
  Scenario: Displaying Product Details of the selected product with quantity
    Given the storeId is "6502cb1a99d74f680c854e09", branchId is "6502cb1a99d74f680c854e0c", and tableId is "100"  
    When I send GET request to "/branchItem/65178495ab16f1c535f1ae70" 
    Then the response status code should be "200"
    Then I receive "_3lechonKawali.json"

  # 6th page Display all selected order
  Scenario: Displaying all the selected Product with price, quantity and total
    Given the storeId is "6502cb1a99d74f680c854e09", branchId is "6502cb1a99d74f680c854e0c", and tableId is "100"
    When I send POST request to "/pos/transaction"
    Then the response status code should be "201"

  # 7th Confirmed order
  Scenario: After the dining confirmed my order 
    Given the storeId is "6502cb1a99d74f680c854e09", branchId is "6502cb1a99d74f680c854e0c", and tableId is "100"
    When I send GET request to "/pos/transaction/status/?sid=6502cb1a99d74f680c854e09&bid=6502cb1a99d74f680c854e0c&tid=100"
    Then the response status code should be "200"
    Then I receive "_3lechonKawali.json"

  # 8th Summary order    
  Scenario: Displaying all selected Product with price, quantity and total
  Given the storeId is "6502cb1a99d74f680c854e09", branchId is "6502cb1a99d74f680c854e0c", and tableId is "100"
  When I send GET request to "/pos/transaction/status/?sid=6502cb1a99d74f680c854e09&bid=6502cb1a99d74f680c854e0c&tid=100"
  Then the response status code should be "200"
  Then I receive "_3lechonKawali.json"

  # # Paymen: Pay cash
  # Scenario: After my order served I want to pay using cash method
  # Given the storeId is "6502cb1a99d74f680c854e09", branchId is "6502cb1a99d74f680c854e0c", and tableId is "100"
  # When I send POST request to "/pos/transaction/651e25e2d9890204f32842f7" to pay
  # Then the response status code should be "201"

