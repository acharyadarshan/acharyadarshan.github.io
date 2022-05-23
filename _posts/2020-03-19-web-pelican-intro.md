---
title: Automated Musical Tune Generation using char RNN
date: 2020-03-19 21:00
categories: [Pelican-for-website-creation]
summary: Get to know how markdown and the python library pelican can be used to create your static website.
tags: [pelican, python, markdown, GitHub-pages, Travis-ci, Disqus, google analytics]
author: Darshan Acharya
---
Demo

{% include iframe_holder.html url="https://youtube.com/embed/NDuJbYVpBW0" width="560" height="315" %}

## Objectives

-To create an automated musical tune prediction model that takes arbitary notes as input and predicts a  sequence of musical notes

-To develop an abc notation media player that can transform the converted note sequence into beautiful musical notes

## Music and it's representation
A musical tune is a combination of sounds in time through the elements of melody, harmony, rhythm, and timbre. Music, like language, is a method of communication in which a series of notes can convey a variety of emotions. One important point to remember is that music must be both expressive and precise. Classical music, for example, is noted for its careful structure and emotional impact. Beginners find it difficult to compose musical tunes because they must first learn the "language" of music, such as time signatures and how to keep unit beats steady throughout a song while introducing creative uniqueness.
We investigate if deep learning can be used to model this dynamic musical structure and effects.  Nowadays, the music generation is quite crucial. It has a wide range of applications. Musicians and artists build on the machine's output to create their creative work. Software-generated music or art is sometimes marketed by the companies or individuals that created it. They can be licensed to businesses and retailers for use in advertising, retail music, and so forth.

## ABC notation

It uses alphanumeric Character to represent music. ABC notation is a simple but powerful ASCII musical notation format. ABC notation consists of 2 parts: first metadata and second actual music representation.
Metadata: Contains the Title(T), Note length(L), Key and Clef(K) and so on. But most important as it determines the beat length of music.

Music: Contain information about actual music.

![abc](https://user-images.githubusercontent.com/67474080/169774597-fdb9e6c5-af3f-4a40-b303-b0c0d9e532cb.png)

## Midi Format

![midi format](https://user-images.githubusercontent.com/67474080/169775222-bd3d10ee-3b9c-43ab-9b84-bea3a1d99cf3.png)

IT Uses Cord name, key and beats to represent music

Image

## Sheet Music

![sheet music](https://user-images.githubusercontent.com/67474080/169775262-227390d2-8f12-44f3-9b71-8c4c9d7c2951.png)

Sheet music is a type of musical notation that is handwritten or printed and includes musical symbols to describe the pitches, rhythms, and chords of a song or instrumental musical composition. 

## Why abc notation?
Music, as we know it, is continuous in formats such as mp3, midi, wav, and so on, and for an artificially intelligent agent to learn from it, it must first master intricate polyphonic structures in music. The entire syntax, grammar, and logic of music make it difficult to build an artificial network because it has so many parameters like amplitude, pitch, timing, and so on.
How does ABC notation help to solve this problem? Music is made using different notes with specific timing for each note. A beautiful melody can be made using such nodes from different instruments superimposing on themselves. Single musical instruments like piano, Guitar, Violin, and bass can be represented using sheet music. Contrary to other formats sheet music is a discrete form of musical representation. But several assumptions like common time (4/4-time signature), key of G, and so on are taken into consideration. And thus, ABC notation maps each symbol from sheet music. ABC notation has strings(A-G). and numerals to represent music. Thus, music is represented in sequential form like the sequence of DNA. This narrow band of string in sequential form is used to train the ANN.

## Dataset Preparation
As bulk music ABC format data is not available in a single source, we’ve collected data from multiple sources using web scraping. Numbers and special characters, as well as letter notations from A to G, are utilized to represent the specified notes in the ABC notation representation of the dataset. Each letter corresponds to a note in the classical scale, such as Do, Re, or MI. Other units are utilized as extra information in addition to the notes that make up the melody, such as the reference number, composer, origin, note length, tempo, rhythm key, ornament, and so on. The characteristics of our data collection are made up of each of these values.  Below is a sample example of music written in ABC notation from the dataset.

Tools used for Web Scraping:  
BeautifulSoup  
Requests

The websites that were used for data collections are:  
  https://abcnotation.com/browseTunes,  
  http://roaringjelly.org  
  http://www.folktunefinder.com  


```python
import requests
from bs4 import BeautifulSoup

f = open('folktune.txt','w')
f.write('')
f.close()

#from page1 to page10
for i in range(1,11):
    url = 'http://www.folktunefinder.com/tunes?features=&page='+str(i)
    page = requests.get(url)
    
    soup = BeautifulSoup(page.text, 'lxml')
    div = soup.find("div", class_= "col-md-9")
    tunes = div.find('ul').find_all("li")
    for tune in tunes:
        print(tune.a.string)
        
        site = 'https://www.folktunefinder.com'+tune.a["href"]
        sitePage = requests.get(site)
        siteSoup = BeautifulSoup(sitePage.text, 'lxml')
        
        f = open('folktune.txt','a')
        f.write(siteSoup.find('pre').string)
        f.write('\n\n\n\n')
        f.close()
```

```python
from bs4 import BeautifulSoup
import requests

f = open('roaringdata.txt','w')
f.write('')
f.close()

url = 'http://roaringjelly.org/~jc/cgi/abc/find.cgi?P=.*&find=FIND&m=title&W=wide&scale=0.65&limit=160&thresh=5&fmt=single&V=1&Tsel=tune&Nsel=0'
page = requests.get(url)
soup = BeautifulSoup(page.text,'lxml')

form = soup.find("form", class_ = "match")
for table in form.find_all('table', class_ = 'match'):
    lengthOfTable = len(table.find_all('tr'))
    
    checkTitle =''
    title = ''
    for i in range(2, lengthOfTable-1):  #final range = lengthOfTable-1
        data = table.find_all('tr')[i]
        title = data.find_all('td')[-1].string
        print(title  + '\n')
        
        
        urlStringConcat = 'http://roaringjelly.org/~jc/cgi/abc/get.cgi?F=ABC&U='
        abcUrl = data.find_all('td')[4].find('a')["href"]
        abcUrl = abcUrl.split('U=')[1]
        finalUrl = urlStringConcat + abcUrl
        print(finalUrl +'\n\n\n\n')
        title = data.find_all('td')[-1].string
        abcPage = requests.get(finalUrl)
        abcSoup = BeautifulSoup(abcPage.text,'lxml')
        
        abc = abcSoup.find("pre").string
        f = open('roaringdata.txt','a', encoding="utf-8")
        f.write(abc)
        f.write('\n\n\n')
        f.close()
        # print(abc)

# parsing all tables
# from each table url is extracted
# this url is used to get abc format data
# file writting
# Same title data is not implemented  
```

```python
import requests
from bs4 import BeautifulSoup


url = 'https://abcnotation.com/browseTunes'
page = requests.get(url)
soup = BeautifulSoup(page.text, 'lxml')

table = soup.find("table", class_ ="width100pc table-bordered")
tableRows = table.find_all('tr')[1]
#should be iterated to all td
for tableData in tableRows.find_all('td'): 
    
    counter = 0
    for firstLink in tableData.find_all('a'):
        try:
            abcWebsite = 'https://abcnotation.com/'
            firstLink =  abcWebsite + firstLink['href']
            
            secondPage = requests.get(firstLink)
            secondSoup = BeautifulSoup(secondPage.text, 'lxml')
            
            checkString = ''
            
            secondSoup.pre.find_all('a')[1]["href"]
            
            for i in secondSoup.pre.find_all('a'):
                try:
                    i["href"]
                    if(i.string != checkString):
                        # # print(i['href'])
                        # print(i.string+'\n')
                        checkString = i.string
                        thirdLink = abcWebsite + i['href']
                        #print(thirdLink)
                        print(counter)
                        counter +=1
                        
                        thirdPage = requests.get(thirdLink)
                        thirdSoup = BeautifulSoup(thirdPage.text, 'lxml')
                        # # print(thirdSoup.find('pre'))
                        
                        f = open('datafromABC.txt','a')
                        f.write(thirdSoup.find('pre').string)
                        f.write('\n\n\n\n')
                        f.close()                            
                        
                except:
                    pass            
        except:
                pass
```
## Data cleaning
Data cleaning is an important task. Uncleaned data produces more inaccuracy in the result.  It helps in detecting, removing and correcting the incomplete, irrelevant, corrupt or inaccurate part of data from a dataset.
Example of a cleaned sample data
```
X:111
T:11. DROPS OF BRANDY (32 bar polka)
T:Spokes's Tune/Vic's No. 2
M:2/4
L:1/8
K:D
d/2e/2|\
fd ec|dc/2B/2 AG|FA dF|EA Ad/2e/2|\
fd ec|dc/2B/2 AG|FA Bc|[1 d D D:| [2 d D D2 |
FA/2A/2 AA|GB/2B/2 BB|FA/2A/2 AF|EA A>G|\
FA df|ge dc|dB AG|FE D2 :|
```

## Data Preparation
Each data point has different characters length. But are a total of 87 unique characters in for musical representation in every data point. Each unique character has been allocated a numerical index. We've developed a dictionary in which the key corresponds to a character and the value is the character's index. We've also made the polar opposite, where the key belongs to the index and the value is the character for ease of recognition.


![unique_chars](https://user-images.githubusercontent.com/67474080/169769684-acd3fcfa-f3e6-4ba0-9251-b0e24beaeb16.png)

Data is fed into batches. We'll feed a batch of character sequences into our model at once. First, we must create our batches. The following parameters have been set:
Batch size = 16 Sequence Length= 64, Input.txt length = 129,665, Number of unique characters = 87
Every batch has got two components, X tensor of size: 16*64 and Y tensor of size: 16*64*87.



## Model Building

The code for model building is available in the repo above. The model buidling process is inspired form the very famous blog of Andrej Karpathy [The Unreasonable Effectiveness of Recurrent Neural Networks](http://karpathy.github.io/2015/05/21/rnn-effectiveness/). Long Short-Term Memory (LSTM) networks are a type of recurrent neural network capable of learning order dependence in sequence prediction problems. Networks in each recurrent cell learns to control the storage of information through the use of:  

**Forget gate**  
The forget gate determines which data need attention and which can be overlooked. The sigmoid function passes information from the current input X(t) and the hidden state h(t-1). Sigmoid generates values ranging from 0 to 1. It determines if a portion of the previous output is required (by giving the output closer to 1). The cell will utilize this value of f(t) for point-by-point multiplication later.

**Input gate**  
To update the cell status, the input gate performs the following processes. The second sigmoid function receives the current state X(t) and the previously hidden state h(t-1). The values are changed from 0 to 1 (important) (not-important). The tanh function will then be used to pass the identical information from the hidden and current states. The tanh operator will construct a vector (C(t)) with all the possible values between -1 and 1 to regulate the network. The activation functions generate output values that are ready for point-by-point multiplication.

**Output gate**  
The value of the next hidden state is determined by the output gate. This state stores data from earlier inputs. The current state and previous concealed state values are first sent to the third sigmoid function. The tanh function is then used to construct a new cell state from the old cell state. These two outputs are multiplied one by one. The network selects which information the concealed state should convey based on the final value. Prediction is based on this concealed state. The new cell state and hidden state are then passed forward to the next time step.


**Why LSTM?**   
Good for handling long term dependencies in data  
Quickly adaptable to new data  
Does not suffer from exploding and vanishing gradients.  
Language models can be operated at the character level, n-gram level,   sentence level or even paragraph level.

![Underlying structure of a single LSTM cell](https://user-images.githubusercontent.com/67474080/169770697-19b3705a-5d30-4074-a691-022bfb633bc5.png)  

**Underlying structure of a single LSTM cell**

![Illustration of multiple LSTM cells to form a network](https://user-images.githubusercontent.com/67474080/169770745-13b5b7de-4c4a-4a22-8c86-3ae29fbb482c.png)

**Illustration of multiple LSTM cells to form a network**


## Workflow
The basic principle in generation of musical notes   
• select some seed information as the first item (e.g., the first note of a melody);   
• feedforward it into the recurrent network in order to produce the next item (e.g., next note);   
• use this next item as the next input to produce the next item; and   
• repeat this process iteratively until a sequence (e.g., of notes, i.e., a melody) of the desired length is produced.

Insert Two figs- underlying stru and mutilple combns

## Dropout layers
The Dropout layer, which helps minimize overfitting, sets input units to 0 at random with a rate frequency at each step during training time. Inputs that are not set to 0 are scaled up by 1/(1 - rate) such that the total sum remains unaltered. The Dropout layer only applies when the training parameter is set to True, which means no data are dropped during inference. When using model.fit, training is automatically set to True, and in other cases, you can manually set the kwarg to True when calling the layer.

## The Softmax Activation function 
In neural network models that predict a multinomial probability distribution, the softmax function is utilized as the activation function in the output layer. Softmax is utilized as the activation function for multi-class classification issues in which class membership is required to classify characters from one of the 87 mappings.

## Optimizer and hyperparameter tuning
Standard gradient descent and its variants still face a lot of problems in training deep neural networks in practical solutions which gave rise to an optimizer called Adam. Adam calculates adaptive learning-rates for every parameter which makes it suitable for sparse datasets. It uses momentum which is a concept that reduces oscillations of loss function in unnecessary directions thereby accelerating the convergence towards the relevant direction. In our case the hyperparameters had values 0.9 and 0.999 and value of 0.0001 as learning rate.

## Model training
The model was trained on a local PC with an RTX 2070 GPU and the required software. Three basic functions comprise the model training. The first function is batch data reading. The second function is to train the batches in a sequential order, and the third is to build the model in which the batches of data are trained. Our batch size is 16, and the length of the sequence is 64. The total number of batches used is 129665, with each batch containing 8104 data points. The training was initially completed over 100 epochs, with each epoch containing 126 batches. Because numerical values are easy to compute. The character to index and vice versa mapping is done here to make the computation easier since numerical values are flexible to perform complex calculations. 
The batch size, sequence length, and vocabulary size inputs are passed to the model construct python method. It then uses category cross entropy and the Adam optimizer to assemble the model. There are 256 LSTM layers in total, with a dropout of 0.2 and a model of sequential flow of pattern and softmax activation function. The generated train model weights are kept in a separate model weights file, and checkpointing is conducted to allow the training procedure to resume if the run time is off for various technical reasons. On a high-end system, model training took 2 hours for 100 epochs with 126 batches each. The model was also evaluated on Google Colab's free version, which took roughly 7 hours.

## Next character probability determination

![Next character probability determination](https://user-images.githubusercontent.com/67474080/169771366-f5dda257-23ed-4676-821a-197c27d4734a.png)


![Next char A](https://user-images.githubusercontent.com/67474080/169771404-3fa474d0-a21d-4c3e-9016-53067b15839b.png)<br>

**Therefore, the next character is: A**

![Next char B](https://user-images.githubusercontent.com/67474080/169771435-20459c1d-61f6-48cf-958b-ae8522a39c3c.png),<br>
**Therefore, the next character is:  “**


A limitation of the iterative feedforward strategy on an RNN, is that generation is deterministic. Indeed, a neural network is deterministic . As a consequence, feedforwarding the same input will always produce the same output. As the generation of the next note, the next note, etc., is deterministic, the same seed note will lead to the same generated series  of notes .  
Sampling Fortunately, will solve this issue.  The assumption is that the output representation of the melody is one-hot encoded. In other words, the output representation  is  of abc  type  with  87  possible  characters,  the  output activation layer  is SoftMax and generation is modeled as a classification task. 

## Model metrics 

![Epoch vs Accuracy Loss plot](https://user-images.githubusercontent.com/67474080/169775526-6e3e30ba-2ab7-4df2-b38b-3f5e93e0beb8.gif)
![Testing different optimizers](https://user-images.githubusercontent.com/67474080/169775546-c47e9d44-ff89-4bce-a365-08025913fde7.png)
![Testing different number of LSTM layers](https://user-images.githubusercontent.com/67474080/169775590-8898b3dc-5453-4614-b1f9-0739e0567541.png)
![Testing different number of dropout values](https://user-images.githubusercontent.com/67474080/169775604-9dc148b6-150b-4620-9f4d-a33e1ddf4168.png)

## Input
As we used RNN technique, the first character for the output can be given. It should be noted that the first character can be random but we can always give freedom to user to choose the first musical character. Moreover, input interface can contain input field to mention the epoch of model to be used for generating the music. As the epoch goes higher the error tends to be lower but takes more computational power. Finally, the length of the piece of music can be manually set. The input interface is similar to below:

![Input](https://user-images.githubusercontent.com/67474080/169776375-3e9a598a-7a1a-42ba-a153-97a6f7343702.png)

Ouput using inbuilt package
![Output using inbuilt package](https://user-images.githubusercontent.com/67474080/169776417-c8993e45-9528-4fe3-9743-39ee81df8c43.png)

Ouput using external web application abcjs.net
![Output using abcjs net](https://user-images.githubusercontent.com/67474080/169776441-d545213f-6422-4bd7-8c5f-06374b615d62.png)



## References

[1]Andrej karpathy. “The Unreasonable Effectiveness of Recurrent Neural Networks”, May 2021  
[2]  J. McCormack, “Grammar based music composition, Complex systems”, Chapter 96, 1996  
[3]  K. Dongwoo, W. Christian, “Computer Assisted Composition with Recurrent Neural Network”, 2018  
[4]  S Madjiheurem, L Qu, C Walder, “Chord2vec: Learning musical chord embeddings - Proceedings of the constructive machine learning”, 2016  
[5] O. D. Van, A. Dieleman, Z. Sander, S. Heiga, K. Vinyals, A. Graves, N. Kalchabrenner, A. Senior, K. Kavukcuogl, “WaveNet:A Generative Model for Raw Audio, 1609”,2016   
[6] Payne, Christine. MuseNet: OpenAI, Available at: openai.com/blog/musenet. 25 Apr. 2019  
[7] C. Dalitz, “ABC User's Guide Book”, Apr. 2022  
[8] L. Richardson, Beautiful soup Documentation Release 4.4.0, 24 Dec. 2019  




