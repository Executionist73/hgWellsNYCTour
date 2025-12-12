import { assetUrl } from './utils';

export interface Location {
  id: string;
  name: string;
  description: string;
  coordinates: [number, number]; // [lat, lng]
  audioUrl?: string;
  transcript: string;
  imageUrl?: string;
}

export interface RoutePath {
  coordinates: [number, number][]; // Array of [lat, lng] pairs
}

// Route paths extracted from KML file
// Path 1: From subway to Columbia University
const path1: RoutePath = {
  coordinates: [
    [40.8081, -73.96387],
    [40.80808, -73.96381],
    [40.8081, -73.9638],
    [40.8081, -73.96379],
    [40.80805, -73.96369],
    [40.80804, -73.96366],
    [40.80794, -73.9637],
  ],
};

// Path 2: From Columbia University to Teachers College
const path2: RoutePath = {
  coordinates: [
    [40.80795, -73.96372],
    [40.80807, -73.96363],
    [40.80871, -73.96317],
    [40.80874, -73.96314],
    [40.80881, -73.96308],
    [40.8092, -73.96281],
    [40.80928, -73.96272],
    [40.80931, -73.9627],
    [40.80985, -73.96231],
    [40.80996, -73.96226],
    [40.81015, -73.96212],
    [40.81025, -73.96204],
    [40.81031, -73.962],
    [40.81033, -73.96199],
    [40.81038, -73.96195],
    [40.81037, -73.96193],
    [40.81039, -73.96192],
    [40.81054, -73.96181],
    [40.81056, -73.96179],
  ],
};

// Path 3: From Teachers College back to subway
const path3: RoutePath = {
  coordinates: [
    [40.81059, -73.96189],
    [40.81056, -73.96179],
    [40.81054, -73.96181],
    [40.81037, -73.96193],
    [40.81038, -73.96195],
    [40.81033, -73.96199],
    [40.81031, -73.962],
    [40.81025, -73.96204],
    [40.81015, -73.96212],
    [40.80996, -73.96226],
    [40.80985, -73.96231],
    [40.80931, -73.9627],
    [40.80928, -73.96272],
    [40.8092, -73.96281],
    [40.80881, -73.96308],
    [40.80874, -73.96314],
    [40.80871, -73.96317],
    [40.80807, -73.96363],
    [40.80795, -73.96372],
    [40.80785, -73.96377],
    [40.80787, -73.96381],
    [40.80792, -73.96393],
    [40.80794, -73.96392],
    [40.80796, -73.96397],
  ],
};

export const routePaths: RoutePath[] = [path1, path2, path3];

export const locations: Location[] = [
  {
    id: "location-1",
    name: "116 St - Columbia University",
    description: "Arrive on the 1 train and exit to your right, here you will see the Columbia University Gates.",
    coordinates: [40.808043, -73.9639122],
    audioUrl: assetUrl("/audio/File1WellsBio.mp3"),
    transcript: `H. G. Wells was an English novelist, journalist, and intellectual whose work laid the foundations of modern science fiction while engaging directly with social and political issues. Trained in the sciences and deeply influenced by evolutionary theory, he used his unique narrative style to explore the future of humanity, the impact of technology, and the fragility of modern civilization.

Born Herbert George Wells on the 21st of September, 1866, in Bromley, Kent, England, to a shopkeeper and a former domestic servant, he grew up in a lower-middle-class household. A childhood accident that left him bedridden for months developed his love for reading, and his educational journey eventually led him to the Normal School of Science in London, where he studied under T. H. Huxley, a famed English biologist who voiced strong support for Charles Darwin's theories of evolution. Wells' experiences with economic struggle and his proximity to a high level of scientific debate shaped his lifelong interest in education, class, and the social role of science.

Wells rose to fame in the 1890s with a series of "scientific romances," better known today as early science fiction. His 1895 work, The Time Machine, cast his views on Victorian class inequality onto an evolved version of humanity in a distant future. 1896's The Island of Dr. Moreau painted a horrific picture of experimentation on humans and animals, with the hapless main character trapped in the realm of a mad scientist. 1897's The Invisible Man had similar themes of the horrors of scientific power paired with a lack of moral restraint, but focused on society's response to the consequences. 1898's The War of the Worlds subjected England to a "reverse-colonial" invasion by technologically superior aliens, similarly to how England had invaded the cultures it colonised. These works laid the foundation for modern science fiction, with their impact still felt more than a century later. They helped establish Wells as one of the most widely read authors of his generation.

Wells shifted his attention toward social and educational issues. In the novel Tono-Bungay, he used the rise and fall of a snake-oil medicine to capture the essence of commercial life, heavily drawing from his own experience. In general, Wells put a lot of himself into all of his characters. During the First World War, Mr Britling Sees It Through follows a comfortable middle-class intellectual as the conflict shatters his world, forging a profound examination of how war affects civilian communities.

The Outline of History attempted nothing less than a continuous narrative of the human past, presenting a relatively affordable account of world history in an accessible format as a tool for creating better-informed, scientifically literate citizens, in the hopes of bettering society in the future. Wells became increasingly involved in politics and social reform. He was an outspoken socialist for much of his life, though he frequently clashed with other prominent socialists over strategy and ideals. Across his essays, lectures, and further speculative works, he argued for a form of "world government" to prevent future wars.

Wells's later years were marked by both public prominence and growing pessimism. He was a loud advocate for writers and against censorship and fascism. The rise of totalitarianism and the devastation of the Second World War killed his earlier optimism about humanity progressing in what he deemed a rational fashion. When he died in London on the 13th of August, 1946, he left behind dozens of novels, short stories, and works of non-fiction. The legacy of his influence on literature and pop culture endures to this day.`,
  },
  {
    id: "location-2",
    name: "Columbia University",
    description: "This is Columbia University. From here you will head to Teachers College.",
    coordinates: [40.8079329, -73.9636964],
    audioUrl: assetUrl("/audio/File2ColumbiaUniversity.mp3"),
    transcript: `In Wells' novel The War in the Air, German airships descend upon early 20th-century New York, raining death and destruction upon the city and securing its surrender. Imagine this passage broadcast on a radio as you take shelter in an Upper West Side building:

"The trouble became acute at last in the streets above Columbia University. The captain of the airship watching this quarter seems to have stooped to lasso and drag from its staff a flag hoisted upon Morgan Hall. As he did so a volley of rifle and revolver shots was fired from the upper windows of the huge apartment building that stands between the University and Riverside Drive. Most of these were ineffectual, but two or three perforated gas-chambers, and one smashed the hand and arm of a man upon the forward platform. The sentinel on the lower gallery immediately replied, and the machine gun on the shield of the eagle let fly and promptly stopped any further shots" (199).

When reading this exhilarating passage, one may wonder why Wells would mention Columbia at all. It turns out that, in 1906, Wells visited New York City on a trip to America. He detailed this trip in his travel essay "The Future in America." This book is a treasure trove of information on Wells' relationship with New York City, and will be a main source for the purposes of this tour. The book has an entire section dedicated to Columbia University, titled, you guessed it, "Columbia University." I will present most of this section, and as you gaze upon the closed iron gates at Broadway and 116th, consider what Wells might think of this sight.

"[T]here was an effect of remoteness about Columbia. It may have been the quality of a blue, still morning of sunshine that invaded my impression. I came up out of the crowded tumult of New York to it, with a sense of the hooting, hurrying traffics of the wide harbor, the teeming East Side, the glitter of spending, the rush of finance, the whole headlong process of America, behind me. I came out of the subway station into wide, still streets. It was very spacious, very dignified, very quiet. Well, I want the universities of the modern state to be more aggressive. I want to think of a Columbia University of a less detached appearance, even if she is less splendidly clad. I want to think of her as sitting up there, cheek on hand, with knitted brows, brooding upon the millions below. I want to think of all the best minds conceivable going to and fro—thoughts and purposes in her organized mind. And when she speaks that busy world should listen...."

Clearly, Wells had a strong opinion about Columbia University, but his views extended to higher education as a whole. If you would like to learn more about his views on higher education, you can read about his visits to other prominent United States universities in the full chapter. Of course, Columbia has also had strong opinions about Wells over the years. Columbia University Libraries provides a very effective online search tool for the archives of Columbia's The Spectator, the prominent student news publication.

In October of 1913, Wells' Tono Bungay was listed as a new book at the University Library. November 1920 saw a half-page "Bookstore Announcement" describing Wells' The Outline of History as "The literary event of 1920, as voiced in opinions of the critics…" and offering a deal of $7.95 per set ($129.11 today). The next month, a review of the book by a member of the Columbia community described the book, "As a handy summary of history and as a fervent expression of a radical's faith, the 'Outline' is worth owning, worth reading" (Moon 4).

Throughout Wells' writing, progressive as he was for his time, there are smatterings of racism, antisemitism, and sexism that are pervasive among writers of the early 20th century. In August 1923, Wells took the front page of The Spectator. "Teachers Say H.G. Wells is Wrong In Condemning American Coeducation" details how Wells called American men "sissies" as a result of being educated alongside women, contradicting statements he had made in his work that were quite forward-thinking on the topic of coeducation. Teachers seemed wholly disappointed in Wells, making a statement on the importance of educating with themes of gender equality.

Another ill-perspective on Wells appears in a satirical section of the March 1924 issue: "Believe it or not, we have found someone who never heard of H.G. Wells! This lost soul is preparing to teach English in the High Schools and to our 'You-never-knew Wells-was-an-English-writer' he returned that 'He was teaching literature—not Wells" (2)!

In December of 1947, Columbia University's President Butler died at the age of 85. The Columbia Spectator mourned his passing, "Friend and counselor to emperors, popes, presidents and scholars of all lands, Dr. Nicholas Murray Butler was acknowledged to be the most distinguished American of his day. Up to the very threshold of death Dr. Butler toiled to save the world from the horrors of 'cruel, relentless war." But one connection of Butler's was specifically mentioned. "Truly a 'citizen of the world,' Dr. Butler was affectionately termed 'the champion international visitor and retriever of foreign orders and decorations' by his friend and admirer, H.G. Wells" (1). Friend and admirer? The relationship between Wells and Dr. Butler seems to have been more of two like-minded intellectuals than friends.

In her book, Covenants without Swords: Idealist Liberalism and the Spirit of Empire, University of Oxford associate professor Jeanne Morefield writes, "Idealistically inclined liberal scholars in Britain recognized Murray Butler, who would later become the president of Columbia University, as a kindred spirit, so much so that H. G. Wells once referred to him as the 'Gilbert Murray of the United States" (112). Gilbert Murray was a prominent Oxford scholar who, like Wells, fervently supported a "League of Nations" to bring an end to war. They collaborated on multiple works, including The Outline of History. It is clear from the way Wells spoke of Dr. Butler that he viewed him with great respect as a fellow scholar and proponent of world peace.

In 1931, Wells visited Columbia once more to give a talk at Teachers College, but this will be focused on at the next location.

Over time, Wells' works have been touched on in various classes, but certain Wellsian scholars have gone to great lengths to study his work and introduce it to new generations of students. Sarah Cole, Parr Professor of English and Comparative Literature and Dean of the School of the Arts at Columbia University, and of course a fervent Wellsian, authored the critically acclaimed book Inventing Tomorrow: H.G. Wells and the Twentieth Century. This book, published by Columbia University Press, suggests that Wells "...offers a timely model for literature's moral responsibility to imagine a better global future." Beyond writing this book, Cole taught a class in the Fall 2025 semester titled "H.G. Wells," for which this project is being created. According to the course description, "This is the first time in Columbia's history that a course has been dedicated to Wells…" The course had students take a deep dive into the world of Wells, acquainting them closely with him, and keeping the spirit of one of the great intellectuals of the 20th century alive within the gates of Columbia University.`,
  },
  {
    id: "location-3",
    name: "Teachers College",
    description: "This is Teachers College, from here you can head back to the 116th St. subway station to head downtown!",
    coordinates: [40.8105631, -73.9617941],
    audioUrl: assetUrl("/audio/File3TeachersCollege.mp3"),
    transcript: `The February 1932 issue of the Teachers College Record features a section titled "Teachers College Gives Luncheon for H.G. Wells and Helen Keller." On November 13, 1931, 133 community members attended to enjoy the occasion and hear the honored guests speak.

Keller, who became deaf and blind in her infancy from an unknown illness, was a proud socialist who protested U.S. involvement in World War 1 and advocated for women's suffrage. She delivered a moving address, of which she provided a transcript to the Record. "I welcome Mr. Wells today with my lips. Many years ago I welcomed him with my mind… and now I greet him in the crusade against war" (447). Wells had initially refused to speak at the event as he disliked public speaking in general, but Keller's words so touched him that he felt it was necessary to respond:

"Efforts to avert war, standing by themselves, are useless, almost worse than useless. The only way we can eliminate war is to eliminate our present economic and political organizations. As long as we have independent sovereign states, separate systems of currency, the need of passports to cross from one state to another, national economic systems—all things that make for irritation —just so long shall we have war. The efforts that peace-loving peoples should make should be toward the building of a federated world. I once said civilization was a race between education and catastrophe.

That is not so. Education has not yet started. There must be an education to break down nationalism, to destroy our present narrow conceptions of patriotism and to create a world organization that will transcend nationalism" (446).

Wells was due to embark for France in just a few hours and so was unable to send a manuscript of his words, but they were dutifully recorded by those in attendance. Just imagine that in this very building, a packed room listened carefully to the words of the great socialist minds of 1931, bidding Wells a gracious farewell shortly before a long boat trip.`,
  },
  {
    id: "location-4",
    name: "Delmonico's",
    description: "A fancy steakhouse where Wells dined in 1906.",
    coordinates: [40.7050268, -74.0102557],
    transcript: `"At a bright table in Delmonico's today at lunch-time, my host told me the first news of the destruction of the great part of San Francisco by earthquake and fire. It had just come through to him; it wasn't yet being shouted by the newsboys. He told me compactly of dislocated water-mains, of the ill-luck of the unusual eastward wind that was blowing the fire up-town, of a thousand reported dead, of the manifest doom of the greater portion of the city, and presently the shouting voices in the street outside arose to chorus him. He was a newspaper man and a little preoccupied because his San Francisco offices were burning, and that no further news was arriving after these first intimations. Naturally, the catastrophe was our topic.

But this disaster did not affect him; it does not seem to have affected anyone with a sense of final destruction, with any foreboding of irreparable disaster. Everyone is talking of it this afternoon, and no one is in the least degree dismayed. I have talked and listened in two clubs, watched people in cars and in the street, and one man is glad that Chinatown will be cleared out for good; another's chief solicitude is for Millet's "Man with the Hoe." "They'll cut it out of the frame," he says, a little anxiously. "Sure." But there is no doubt anywhere that San Francisco can be rebuilt, larger, better, and soon.

Just as there would be none at all if all this New York that has so obsessed me with its limitless bigness was itself a blazing ruin. I believe these people would more than half like the situation. It would give them scope, it would facilitate that conversion into white marble in progress everywhere, it would settle the difficulties of the Elevated railroad, and clear out the tangles of lower New York. There is no sense of accomplishment and finality in any of these things; the largest, the finest, the tallest, are so obviously no more than symptoms and promises of Material Progress, of inhuman material progress that is so in the nature of things that no one would regret their passing.

That, I say again, is at the first encounter the peculiar American effect that began directly I stepped aboard the liner, and that rises here to a towering, shining, clamorous climax. The sense of inexhaustible supply, of an ultra-human force behind it all, is, for a time, invincible" (Wells 40-42).`,
  },
  {
    id: "location-5",
    name: "Statue of Liberty Lookout",
    description: "From here you can gaze upon the Statue of Liberty, which Wells found rather unimpressive, as well as Ellis Island, which he toured and found quite impressive.",
    coordinates: [40.7009236, -74.0151612],
    transcript: `"One gets a measure of the quality of this force of mechanical, of inhuman, growth as one marks the great statue of Liberty on our larboard, which is meant to dominate and fails absolutely to dominate the scene. It gets to three hundred feet, about, by standing on a pedestal of a hundred and fifty; and the uplifted torch, seen against the sky, suggests an arm straining upward, straining in hopeless competition with the fierce commercial altitudes ahead. Poor liberating Lady of the American ideal! One passes her and forgets" (Wells 36).

"I visited Ellis Island yesterday. It chanced to be a good day for my purpose. For the first time in its history, this filter of immigrant humanity has this week proved inadequate to the demand upon it. It was choked, and half a score of gravid liners were lying uncomfortably up the harbor, replete with twenty thousand or so of crude Americans from Ireland and Poland and Italy and Syria and Finland and Albania; men, women, children, dirt, and bags together… Yes, Ellis Island is quietly immense. It gives one a visible image of one aspect at least of this world-large process of filling and growing and synthesis, which is America… In one record day this month 21,000 immigrants came into the port of New York alone; in one week, over 50,000. This year, the total will be 1,200,000 souls, pouring in, finding work at once, producing no fall in wages. They start digging and building and making. Just think of the dimensions of it" (Wells 43-47)!`,
  },
  {
    id: "location-6",
    name: "Statue of Liberty",
    description: "The Statue of Liberty.",
    coordinates: [40.6892494, -74.0445004],
    transcript: `"One gets a measure of the quality of this force of mechanical, of inhuman, growth as one marks the great statue of Liberty on our larboard, which is meant to dominate and fails absolutely to dominate the scene. It gets to three hundred feet, about, by standing on a pedestal of a hundred and fifty; and the uplifted torch, seen against the sky, suggests an arm straining upward, straining in hopeless competition with the fierce commercial altitudes ahead. Poor liberating Lady of the American ideal! One passes her and forgets" (Wells 36).`,
  },
  {
    id: "location-7",
    name: "Brooklyn Bridge",
    description: "Wells' favorite New York structure.",
    coordinates: [40.7060855, -73.9968643],
    transcript: `"Much more impressive than the sky-scrapers to my mind is the large Brooklyn suspension-bridge. I have never troubled to ask who built that; its greatness is not in its design, but in the quality of necessity one perceives in its inanimate immensity.

It tells, as one goes under it up the East River, but it is far more impressive to the stranger to come upon it by glimpses, wandering down to it through the ill-paved van-infested streets from Chatham Square. One sees parts of Cyclopean stone arches, one gets suggestive glimpses through the jungle growth of business now of the back, now of the flanks, of the monster; then, as one comes out on the river, one discovers far up in one's sky the long sweep of the bridge itself, foreshortened and with a maximum of perspective effect; the streams of pedestrians and the long line of carts and vans, quaintly microscopic against the blue, the creeping progress of the little cars on the lower edge of the long chain of netting; all these things dwindling indistinguishably before Brooklyn is reached" (Wells 37-38).`,
  },
  {
    id: "location-8",
    name: "Pier 15 East River Esplanade",
    description: "A great viewpoint of the Brooklyn Bridge.",
    coordinates: [40.7043756, -74.0029654],
    transcript: `"Much more impressive than the sky-scrapers to my mind is the large Brooklyn suspension-bridge. I have never troubled to ask who built that; its greatness is not in its design, but in the quality of necessity one perceives in its inanimate immensity.

It tells, as one goes under it up the East River, but it is far more impressive to the stranger to come upon it by glimpses, wandering down to it through the ill-paved van-infested streets from Chatham Square. One sees parts of Cyclopean stone arches, one gets suggestive glimpses through the jungle growth of business now of the back, now of the flanks, of the monster; then, as one comes out on the river, one discovers far up in one's sky the long sweep of the bridge itself, foreshortened and with a maximum of perspective effect; the streams of pedestrians and the long line of carts and vans, quaintly microscopic against the blue, the creeping progress of the little cars on the lower edge of the long chain of netting; all these things dwindling indistinguishably before Brooklyn is reached" (Wells 37-38).`,
  },
  {
    id: "location-9",
    name: "Flatiron Building",
    description: "Wells singled this building out during his visit to Fifth Avenue.",
    coordinates: [40.7410605, -73.9896986],
    transcript: `"I visited immense and magnificent clubs—London has no such splendors as the Union, the University, the new hall of the Harvard—I witnessed the great torrent of spending and glittering prosperity in carriage and motor-car pour along Fifth Avenue.

I became aware of effects that were not only vast and opulent but fine. It grew upon me that the Twentieth Century, which found New York brown-stone of the color of desiccated chocolate, meant to leave it a city of white and colored marble. I found myself agape, admiring a sky-scraper—the prow of the Flat-iron Building, to be particular, ploughing up through the traffic of Broadway and Fifth Avenue in the afternoon light." (Wells 40).`,
  },
  {
    id: "location-10",
    name: "Ellis Island",
    description: "Wells toured here, finding the proportions of the immigration it handled shocking.",
    coordinates: [40.698939, -74.040506],
    transcript: `"I visited Ellis Island yesterday. It chanced to be a good day for my purpose. For the first time in its history, this filter of immigrant humanity has this week proved inadequate to the demand upon it. It was choked, and half a score of gravid liners were lying uncomfortably up the harbor, replete with twenty thousand or so of crude Americans from Ireland and Poland and Italy and Syria and Finland and Albania; men, women, children, dirt, and bags together… Yes, Ellis Island is quietly immense. It gives one a visible image of one aspect at least of this world-large process of filling and growing and synthesis, which is America… In one record day this month 21,000 immigrants came into the port of New York alone; in one week, over 50,000. This year, the total will be 1,200,000 souls, pouring in, finding work at once, producing no fall in wages. They start digging and building and making. Just think of the dimensions of it" (Wells 43-47)!`,
  },
  {
    id: "location-11",
    name: "The University Club of New York",
    description: "Briefly mentioned by Wells.",
    coordinates: [40.7613615, -73.9756206],
    transcript: `"I visited immense and magnificent clubs—London has no such splendors as the Union, the University, the new hall of the Harvard—I witnessed the great torrent of spending and glittering prosperity in carriage and motor-car pour along Fifth Avenue.

I became aware of effects that were not only vast and opulent but fine. It grew upon me that the Twentieth Century, which found New York brown-stone of the color of desiccated chocolate, meant to leave it a city of white and colored marble. I found myself agape, admiring a sky-scraper—the prow of the Flat-iron Building, to be particular, ploughing up through the traffic of Broadway and Fifth Avenue in the afternoon light." (Wells 40).`,
  },
];
