# Mars Rover - Kata
## Instructions  
1. Enter *grid* to see the grid and all elements' location
2. There are a main rover (*mR*), starting at (0, 0), and a changeable number of rovers (*allRovers*), located at random coordinates. Number of rovers will be 2 by default
3. There is a random number of obstacles between 0 and 3
4. Rover's information:
    - *mR* to see main rover's direction, display name, coordinates and travel log
    - Access other rovers' information with *allRovers[index]*, but be aware it's zero-indexed. So to access R1 the command needed will be *allRovers[0]* and so on
5. Rover's movement:
    - Use *commands(str, rover)* to move rover of your choice
    - *str* is a string with following letters: f to move forward, b to move backwards, l to turn left and r to turn right
    - *rover* is *mR* or *allRovers[index]*, as explained before
