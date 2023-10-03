Feature: One Customer One Table Journey

  # 3rd page
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

  #Lechon Kawali selected
  Scenario: Displaying Product Details of the selected product with quantity
    Given the storeId is "6502cb1a99d74f680c854e09", branchId is "6502cb1a99d74f680c854e0c", and tableId is "100"  
    When I send GET request to "/branchItem/65178495ab16f1c535f1ae70" 
    Then the response status code should be "200"
    Then I receive "_3lechonKawali.json"