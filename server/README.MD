THe cluster module will allow us to run the same program on lots of threads, mangage the traffic.

The Adapter's job is to make sure that everything gets to the right client, which is the extra work the primary node is going to have to do.

Sticky sessions is going to make sure that if you get disconnected or if we're using long polling, we can get back to the correct thread.


// In a nutshell
Our Socket.io server is running on a computer.
That computer has a bunch of cores, almost certainly is going to have more that one core.
Each core represents two threads.
A node program can only run on one thread, no expections.
So, what we're going to do in the case here, we've got n threads. We are going to spawn up n node programs.
So the exact same program is going to run n times and its primary job when someone new comes in to figure out which of those n programs should handle this particular traffic. 
So the node client comes in port 3000 primary will get it to one of the threads.

In addition to that,
The Adapter's job is to help primary(inside socket.io server) to the right placess.
Sticky sessions will help the node client or the react client get back to the right worker. 

😊 Happy Coding !