"use client";

import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import AudioSection from "@/components/AudioSection";
import { locations, routePaths } from "@/lib/locations";
import { assetUrl } from "@/lib/utils";

const TourMap = dynamic(() => import("@/components/TourMap"), {
  ssr: false,
});

export default function Home() {
  const audioSectionsRef = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const headerRef = useRef<HTMLDivElement | null>(null);
  const sourcesRef = useRef<HTMLDivElement | null>(null);
  const [activeLocationId, setActiveLocationId] = useState<string | null>(null);
  const [showFullRoute, setShowFullRoute] = useState(false);

  const handleLocationClick = (locationId: string) => {
    const element = audioSectionsRef.current[locationId];
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Intersection Observer to detect which section is in view
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    // Observe header section
    if (headerRef.current) {
      const headerObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveLocationId(null);
              setShowFullRoute(true);
            }
          });
        },
        {
          threshold: 0.3,
          rootMargin: "-20% 0px -20% 0px",
        }
      );
      headerObserver.observe(headerRef.current);
      observers.push(headerObserver);
    }

    // Observe sources section
    if (sourcesRef.current) {
      const sourcesObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveLocationId(null);
              setShowFullRoute(true);
            }
          });
        },
        {
          threshold: 0.3,
          rootMargin: "-20% 0px -20% 0px",
        }
      );
      sourcesObserver.observe(sourcesRef.current);
      observers.push(sourcesObserver);
    }

    // Observe location sections
    locations.forEach((location) => {
      const element = audioSectionsRef.current[location.id];
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveLocationId(location.id);
              setShowFullRoute(false);
            }
          });
        },
        {
          threshold: 0.3,
          rootMargin: "-20% 0px -20% 0px",
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50 via-amber-50/95 to-amber-100/80">
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Map Section - Sticky */}
          <aside className="lg:sticky lg:top-24 lg:self-start lg:w-1/2 mb-8 lg:mb-0">
            <div className="mb-6 text-center">
              <h2 className="font-serif text-3xl font-bold text-amber-900 sm:text-4xl">
                Location Map
              </h2>
              <p className="mt-2 font-serif text-lg italic text-amber-800/80">
                Click on any location to hear its story
              </p>
            </div>
            <TourMap 
              locations={locations} 
              routePaths={routePaths} 
              onLocationClick={handleLocationClick}
              activeLocationId={activeLocationId}
              showFullRoute={showFullRoute}
            />
          </aside>

          {/* Right Scrolling Column */}
          <div className="lg:w-1/2">
            {/* Header Section */}
            <div ref={headerRef} className="mb-12">
              <Header />
            </div>

            {/* Audio Sections */}
            <section className="space-y-8 mb-12">
              <div className="mb-8 text-center">
                <h2 className="font-serif text-3xl font-bold text-amber-900 sm:text-4xl">
                  Audio Narratives
                </h2>
                <p className="mt-2 font-serif text-lg italic text-amber-800/80">
                  Listen to the tales of each location
                </p>
              </div>
              
              {locations.map((location) => (
                <div
                  key={location.id}
                  ref={(el) => {
                    audioSectionsRef.current[location.id] = el;
                  }}
                >
                  <AudioSection location={location} />
                </div>
              ))}
            </section>

            {/* Additional Content Section */}
            <section className="mt-16 border-t-4 border-amber-900/30 bg-amber-900/5 py-12">
              <div className="px-4 sm:px-6 lg:px-8">
                <h2 className="mb-6 font-serif text-3xl font-bold text-amber-900 sm:text-4xl">
                  Additional Content
                </h2>
                <div className="rounded-lg border-2 border-amber-900/30 bg-amber-50/80 p-6">
                  <h3 className="mb-3 font-serif text-2xl font-bold text-amber-900">
                    Orson Welles and H.G. Wells: The 1940 Interview
                  </h3>
                  <p className="mb-4 font-serif text-amber-900/90 leading-relaxed">
                    In 1940, H.G. Wells and Orson Welles met for the first time in San Antonio, Texas. 
                    This interview, conducted by Charles C. Shaw on KTSA radio, brought together the legendary 
                    author and the theatrical genius who had adapted Wells' "War of the Worlds" for radio two 
                    years earlier, causing a famous panic. Listen to their fascinating discussion about war, 
                    democracy, and the future of civilization.
                  </p>
                  <div className="mb-4 rounded-lg bg-amber-900/10 p-4">
                    <audio 
                      controls 
                      className="w-full"
                      src={assetUrl("/audio/File4WellesWellsInterviewTranscript.mp3")}
                    >
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                  <details className="font-serif text-sm text-amber-900/90">
                    <summary className="cursor-pointer font-semibold hover:text-amber-900 mb-2">
                      Read Full Interview Transcript
                    </summary>
                    <div className="mt-4 max-h-96 overflow-y-auto space-y-3 text-xs leading-relaxed border-t border-amber-900/20 pt-4">
                      <p className="italic">The following is a 1940 KTSA interview of H.G. Wells and Orson Welles conducted by Charles C. Shaw. This was conducted during Wells' final recorded trip to the United States, which, according to Texas Public Radio, led him to San Antonio for the purpose of addressing the United States Brewers Association.</p>
                      
                      <p className="italic">Wells and Welles joke about their shared name and the sensationalized "panic" over the 1938 War of the Worlds broadcast. They argue that the world is now living in a Wellsian future of total war, analyze the effect of the war on the arts, and defend democracy. They urge the defeat of Nazism through air power, and criticize xenophobia towards Russia, calling for an understanding with the foreign power. Welles plugs his experimental new film Citizen Kane, and Wells introduces his novel Babes in the Darkling Wood as the conversation moves between light-hearted banter and serious discussion.</p>
                      
                      <p><strong>Shaw:</strong> Good evening, ladies and gentlemen. This is Charles C. Shaw speaking. KTSA is honored this evening by the presence in our studios of two great men, the Honorable H.G. Wells, world-famous British historian, author, and student of world affairs, and Mr. Orson Welles, the genius of stage, screen, and radio.</p>
                      
                      <p>This is the first time that Mr. H.G. Wells and Mr. Orson Welles have appeared together. In fact, they met for the first time only yesterday here in San Antonio, but this is not the first time that their names have been linked. Two years ago, Mr. Orson Welles adapted Mr. H.G. Wells' book, War of the Worlds, for radio purposes, and you know the rest.</p>
                      
                      <p>Revising the story somewhat, Mr. Orson Welles depicted an invasion of the United States by men from Mars. Although he explained numerous times during the program that it was fictitious, the country at large was frightened almost out of its wits. Men called radio stations, offering to enlist against the Martians.</p>
                      
                      <p>Others were panic-stricken. The realism of the production, frightening though it was, was a tribute to Mr. Orson Welles' genius. And thus the name of Welles, H.G.W.E.L.L.S., and Orson W.E.L.L.E.S., became linked.</p>
                      
                      <p>Mr. H.G. Wells, in the opinion of many, is the world's most famous man of letters. He has come to San Antonio to address the United States Brewers Association, and Mr. Orson Welles is here for a town hall forum address Wednesday. In this meeting of great minds, I feel rather inconspicuous, and the less I have to say, the better you listeners will like it.</p>
                      
                      <p>But first, could I interest you gentlemen in a discussion of Mr. Orson Welles' broadcast of Mr. H.G. Wells' book, The War of the Worlds?</p>
                      
                      <p><strong>Welles:</strong> Are you turning the meeting over to us, sir?</p>
                      
                      <p><strong>Shaw:</strong> I am, for the moment.</p>
                      
                      <p><strong>Wells:</strong> He's turning it over to us. Well, I've had a series of the most delightful experiences since I came to America, but the best thing that has happened so far is meeting my little namesake here, Orson. I find him the most delightful carrier. He carries my name and an extra E that I hope he'll drop sooner or later. I see no sense in it.</p>
                      
                      <p>And I've known his work before he made this sensational Halloween spree. Are you sure there was such a panic in America, or wasn't it your Halloween fun?</p>
                      
                      <p><strong>Welles:</strong> I think that's the nicest thing that a man from England could possibly say about the men from Mars. Mr. Hitler made a good deal of sport of it, you know, and actually spoke of it in the great Munich speech, you know, and there were floats in Nancy Parade.</p>
                      
                      <p><strong>Wells:</strong> He hadn't much else to say.</p>
                      
                      <p><strong>Welles:</strong> That's right, it hadn't much else to say, and it's supposed to show the corrupt condition and decadent state of affairs in democracies, that the war of the world went over as well as it did. I think it's very nice of Mr. Wells to say that not only I didn't mean it, but the American people didn't mean it.</p>
                      
                      <p><strong>Wells:</strong> That was our impression in England. We had articles about it, and people said, have you never heard of Halloween in America when everybody pretends to see ghosts?</p>
                      
                      <p><strong>Shaw:</strong> Well, there was some excitement caused. I really can't belittle the amount that was caused, but I think that the people got over it very quickly, don't you?</p>
                      
                      <p><strong>Welles:</strong> What kind of excitement? Mr. H.G. Wells wants to know if the excitement wasn't the same kind of excitement that we extract from a practical joke in which somebody puts a sheet over his head and says, "boo." I don't think anybody believes that that individual is a ghost, but we do scream and yell and rush down the hall. And that's just about what happened.</p>
                      
                      <p><strong>Shaw:</strong> That's a very excellent description.</p>
                      
                      <p><strong>Wells:</strong> You aren't quite serious in America yet.</p>
                      
                      <p>You haven't got the war right under your chins, and the consequence is you can still play with ideas of terror and conflict. You think that's good or bad? It's a natural thing to do until you're right up against it.</p>
                      
                      <p><strong>Welles:</strong> So it ceases to be a game.</p>
                      
                      <p><strong>Wells:</strong> And then it ceases to be a game.</p>
                      
                      <p><strong>Shaw:</strong> Well, now, here's a thought. Some of Mr. H.G. Wells' writings are termed fantastic, and a few years ago, well might they have been conceived such. The Shape of Things to Come, which told of a long, internecine war, was such a fantasy.</p>
                      
                      <p>But Mr. Orson Welles, do you think that it's so fantastic in view of today's events?</p>
                      
                      <p><strong>Welles:</strong> It certainly is not so fantastic, and the one question that Mr. Wells has spoken of not only in The Shape of Things to Come, but has hinted at or directly prophesied such a state of affairs following a wasting war and a return to a feudalism from which the world would find itself again. And today, in Mr. Wells' lecture, he said quite the most interesting thing that I've heard in a long time. He said that he commenced just recently to ask himself if there was any reason why mankind should so emulate the phoenix, and should so get itself out of its mess.</p>
                      
                      <p>He proposed a couple of solutions, but he did admit that there was a possible excuse for a gloomy point of view, and that it would be good to be realistic about it and not to dismiss the gloomy point of view anymore. Perhaps the time had come to look ahead, since the future, Mr. Wells' future, which we've always adored and never really understood, is suddenly upon us. And we are living right now in that famous H.G. Wells future, which we all knew about.</p>
                      
                      <p><strong>Wells:</strong> Now, before we get away from this microphone, tell me about this film of yours that you've been producing. You're a producer, aren't you? You're an art director, you're everything. What's the film called?</p>
                      
                      <p><strong>Welles:</strong> It's called Citizen Kane.</p>
                      
                      <p><strong>Wells:</strong> Citizen Kane, yes. Not C-A-I-N.</p>
                      
                      <p><strong>Welles:</strong> No, K-A-N-E, and that's, of course, the kindest and most gracious possible thing to do. Mr. Wells is making it possible for me to do what in America is spoken of as a "plug."</p>
                      
                      <p><strong>Wells</strong> (interjecting): I don't understand these words, yes!</p>
                      
                      <p><strong>Welles:</strong> You understand the value. Mr. Wells wants me to tell you that I have made a motion picture, and he is kind enough to ask me a leading question concerning it.</p>
                      
                      <p><strong>Wells:</strong> I am looking forward to it.</p>
                      
                      <p><strong>Welles:</strong> Very kind, sir.</p>
                      
                      <p>It's a new sort of motion picture with a new method of presentation and a few new technical experiments, a few new methods of telling a picture, not only from the point of view of writing, but of showing it.</p>
                      
                      <p><strong>Wells:</strong> If I don't misunderstand you completely, I think there'll be a lot of jolly good new noises in it.</p>
                      
                      <p>(laughter from all)</p>
                      
                      <p><strong>Welles:</strong> I hope so.</p>
                      
                      <p>Jolly good new noises are what motion pictures could well afford these days. I hope you're right, and I hope there are some jolly good new noises. I can think of nothing more desirable in a motion picture. I'm all for some jolly good new noises.</p>
                      
                      <p><strong>Shaw:</strong> Wasn't it you, Mr. Orson Welles, that presented for the first time in modern times plays without scenery and settings in your video series?</p>
                      
                      <p><strong>Welles:</strong> That's right, yes. There's no such thing as a play without settings, because there's got to be something behind an actor, and you've got to look at something.</p>
                      
                      <p><strong>Wells:</strong> Very simple settings. I had an extraordinary experience once. I saw Ellen Terry's son. What was his name?</p>
                      
                      <p><strong>Welles:</strong> Ellen Terry's son?</p>
                      
                      <p><strong>Wells:</strong> Yes, his production of Hamlet.</p>
                      
                      <p><strong>Welles:</strong> You mean Gielgud?</p>
                      
                      <p><strong>Wells:</strong> No, no, no.</p>
                      
                      <p><strong>Welles:</strong> Gielgud is a relation of the Terrys.</p>
                      
                      <p><strong>Wells:</strong> No, no, no. Never mind his name for the moment, but I saw Hamlet produced in Russian in Moscow.</p>
                      
                      <p><strong>Welles:</strong> Oh, the Stanislavski production.</p>
                      
                      <p><strong>Wells:</strong> No, no, the...</p>
                      
                      <p><strong>Welles:</strong> This I know nothing about.</p>
                      
                      <p><strong>Wells:</strong> I'm sorry.</p>
                      
                      <p><strong>Welles:</strong> Awfully sorry.</p>
                      
                      <p><strong>Wells:</strong> Yes. And that was done with screens, don't you know, and nothing else. It was done in Russian. I know my Hamlet pretty well, and all the time I thought I was listening to the English play. Do you understand that?</p>
                      
                      <p><strong>Welles:</strong> Wonderful, yes.</p>
                      
                      <p><strong>Wells:</strong> Yes. That was a great show.</p>
                      
                      <p><strong>Shaw:</strong> What do you think the effect, what effect do you think this war, or any war, will have or is having on the arts, principally the theatre and literature?</p>
                      
                      <p><strong>Wells:</strong> Well, now, in a country that is fighting hard, as Britain is doing, the arts go into a temporary rest. But I think if we come out of the war, then there will be a great renaissance because we shall have a greater sense of reality, less respect, don't you know, for tradition and the old-fashioned way of looking at things.</p>
                      
                      <p><strong>Welles:</strong> Oh, I agree so much.</p>
                      
                      <p><strong>Wells:</strong> I think it means...</p>
                      
                      <p><strong>Welles:</strong> A great purge, I think.</p>
                      
                      <p><strong>Wells:</strong> It doesn't mean disaster, this war. It means a tremendous renaissance of the human mind.</p>
                      
                      <p><strong>Welles:</strong> A new approach to realities in terms of the arts. Of course, now in America we go through the worst possible stage in the arts because we are not ourselves engaged in the war, and the war is only a kind of conception in the newspapers for us.</p>
                      
                      <p>But it has affected us sufficiently to degrade the taste, and we're going through that period of mild war hysteria, which means a degradation of standards in the arts, particularly in the theatre arts, but a tremendous boom in the financial aspects thereof, as if people are rushing into the theatres, but they're rushing into the wrong theatres to see the worst kind of pack. After we get into the war, and if we do, and after we get into the kind of trouble that we're bound to get into if it isn't precisely the war that we're speaking of now, since the war becomes a new war every week, and after we get into whatever it is we're going to get into, the same thing will be true of us, I think, and our arts will go into a temporary decline. But again, any sort of success following this war must make a whole new approach to the arts possible. It's always a great purge, I think, in the visual arts and in the theatre arts, particularly in letters.</p>
                      
                      <p><strong>Wells:</strong> What happens to our democratic peoples is first there's a shock–</p>
                      
                      <p><strong>Welles:</strong> Yes.</p>
                      
                      <p><strong>Wells:</strong> –and then after the shock they pull themselves together, and we've had the shock, and now I hope we're going to pull ourselves together, and that means politics, war, art, everything become more rational, more powerful. We should take a step forward unless we take a step backward and go over the precipice.</p>
                      
                      <p><strong>Shaw:</strong> Do you think that that shock is due to a lack of discipline in a democratic country as opposed to a totalitarian country?</p>
                      
                      <p><strong>Wells:</strong> Oh no.</p>
                      
                      <p><strong>Shaw or Welles:</strong> Oh good. I'm so glad.</p>
                      
                      <p><strong>Wells:</strong> Discipline is a word for children and, you know, people who have to salute and that sort of thing. Grown-up people do want to live freely and largely, therefore any group of gangsters who get together and give themselves wholly up to getting power have a temporary advantage. You know, you've been through the whole of this thing on a small scale with your gangsters here who've had, for a time, a reign of terror.</p>
                      
                      <p>They terrorized...</p>
                      
                      <p><strong>Welles:</strong> And a very real discipline in their own ranks.</p>
                      
                      <p>(overlapping conversation)</p>
                      
                      <p><strong>Wells:</strong> Fear, discipline in their own ranks. But directly your democracy said this is too serious and we can't let it go at that.</p>
                      
                      <p>You've dealt with them. We have to deal with this assault on civilization because it all comes through the air, you know, and until we've got the world's control of the air this sort of thing may come back. That's the thing that we have to stop.</p>
                      
                      <p><strong>Shaw:</strong> Well, do you think that this faculty that makes people get shocked, this trait that makes them get shocked, is a sign of adulthood as compared with a more childlike attitude on the part of those who are under totalitarian rule?</p>
                      
                      <p><strong>Wells:</strong> I think adult people want to live their own lives, try experiments with life, do this and that and the other thing, and therefore any sort of criminal who chooses to concentrate on terrorism gets a temporary advantage. And you can't cure that. The grown-up world is at the mercy of the criminal until you've developed a method of dealing with the criminal.</p>
                      
                      <p>But a method can be developed.</p>
                      
                      <p><strong>Welles:</strong> Naturally there's a momentary period of surprise because we're not, by the very nature of our way of life, we're not equipped to deal with what is foreign to our conception of a way of life, so that the first shock must necessarily be very great.</p>
                      
                      <p><strong>Wells:</strong> If you have a happy village of people doing this, that, and the other thing, and you get a dangerous lunatic who begins to go about terrorising the whole village, it's a great nuisance, but you have to pull yourselves together and suppress that lunatic. That's what civilisation has to do now.</p>
                      
                      <p><strong>Welles:</strong> And for a moment, speaking of your business of the shock, for a moment of course everybody is merely appalled, and during that period of mere shock and mere terror, the criticisms against democracy sound very valid indeed. But we know that Mr. Wells' community is going to pull itself together and going to deal with this lunacy.</p>
                      
                      <p><strong>Shaw:</strong> Well, do you think, Mr. H.G. Wells, that Britain's reverses, early reverses, may have been due to that initial period of shock, and that now they're over it?</p>
                      
                      <p><strong>Wells:</strong> I think that our people could not believe that a whole nation could grow so mad as the Nazi Socialists, and therefore they said, poor dears, they must be dreadfully distressed about something, give them something, appease them, what is the trouble? But you see, the more they appease, the more frightfully attacked.</p>
                      
                      <p><strong>Welles:</strong> Because you can't appease paranoia. Every psychiatrist in the world, in any court of law, can tell you that the way to deal with paranoia is not by appeasement.</p>
                      
                      <p>But we didn't have any psychiatrists in power politics at the time. We simply had sort of goodwill and futile humanistic...</p>
                      
                      <p><strong>Wells:</strong> Well, this thing has to be settled now. It has to be…</p>
                      
                      <p>One dread that I have is appeasement, more some attempt now to call this fight off before it's fairly finished. You back up the British, because we can beat the National Socialists. We don't want a single American to die as an American soldier in Europe.</p>
                      
                      <p>But– don't get in the way when it comes to a settlement. Don't let them off, because this has to be a decisive fight. And at the end, we've got to have all the world disarmed so far as the air goes, because there'll be no peace until there's a complete control of the air by the civilized forces in the world.</p>
                      
                      <p><strong>Shaw:</strong> Who do you include as among the civilized nations, Mr. Wells?</p>
                      
                      <p><strong>Wells:</strong> Well, the three nations that can put over peace in the air at the present time are America, the British system, and Russia. And if you can make friends with Russia, Russia is a very difficult, fickle country, and you may find a lot of difficulty in making friends. But if you can work somehow with the Russian, then you can now make peace in the air for all time.</p>
                      
                      <p><strong>Shaw:</strong> Wouldn't you have to appease Russia?</p>
                      
                      <p><strong>Welles:</strong> Why appease Russia?</p>
                      
                      <p><strong>Wells:</strong> Why appease Russia?</p>
                      
                      <p><strong>Welles:</strong> I don't understand such a question.</p>
                      
                      <p><strong>Shaw:</strong> To recognize her conquests?</p>
                      
                      <p><strong>Welles:</strong> What conquests?</p>
                      
                      <p><strong>Shaw:</strong> Of the Baltic countries?</p>
                      
                      <p><strong>Welles:</strong> Wait a minute.</p>
                      
                      <p><strong>Wells:</strong> Listen to that.</p>
                      
                      <p>Well, we English have had a lesson about that. We let the Germans push their airports right up to the English Channel. We let them put guns that can fire into Dover. We had our time over again. We should certainly have bombed Berlin when we were right up on the French frontier. And we should have taught them the mischief of trying to make war in somebody else's country. Now the Russians have done nothing but push back the German bases so that they can't do a blitzkrieg on Moscow.</p>
                      
                      <p><strong>Welles:</strong> This has been misrepresented as imperialism, which is of course absurd, because if Russia wasn't bound for imperialism, which is inconceivable anyway considering the internal economy of Russia, they certainly would have behaved in a very different way.</p>
                      
                      <p><strong>Wells:</strong> How would America behave if you had guns commanding the approach to New York on Staten Island? If you had a brave little foreign country in New Jersey? If you had Nazi bases creeping up through the French colonies, creeping up through South America so that presently it would be quite an easy job to bomb New York, would America wait for it? Is America waiting for it today? No, what you are doing as fast as you can is pushing back any possibility of getting bomber planes over America.</p>
                      
                      <p><strong>Shaw:</strong> By that you refer to our air bases in the Caribbean and the Atlantic.</p>
                      
                      <p><strong>Wells:</strong> Yes, and in preventing any settlement of an air base anywhere that comes through. It's the obvious policy.</p>
                      
                      <p>Have the Russians done any worse than that? Aren't the English now bitterly repenting of the fact that they didn't bomb Berlin when they could have bombed Berlin quite easily, and that they've allowed the German bases to creep forward so that at night we get the raiders over the mouth of the Thames? You see, learn from us. If you learn from us, you not only find your own policy clear, but you also see the reason, the good, sound common sense of the Russian action with regard to Geneva and with regard to the Curzon Line.</p>
                      
                      <p><strong>Shaw:</strong> Well, Mr. Orson Welles, don't you agree that the press and other mediums of public opinion in this country have painted the Russians pretty much villains?</p>
                      
                      <p><strong>Welles:</strong> Oh, naturally, and appallingly so.</p>
                      
                      <p>I mean, the foreign correspondents working on American wire services are emotionally unprepared to deal sensibly and in a neutral and decent way about the whole Russian business, and the press represents for the most part vested interest in America, and therefore the whole Russian picture has been so falsified as to make it almost impossible to discuss with the ordinary intelligent American the Russian position. It's a great tragedy because perhaps the hope of the world is some sort of alliance with Russia. I'm not speaking of a communist revolution–</p>
                      
                      <p><strong>Wells:</strong> Understanding, understanding.</p>
                      
                      <p><strong>Welles:</strong> –but an understanding with the aims of Russia, no matter how much we may quarrel with the administration of the Russian ideal.</p>
                      
                      <p>After all, it's not too foreign from the democratic ideal, but the democratic ideal has chosen to divorce itself from this, and this choice has been made by vested interest, by people who shake with terror at the mere mention of any sort of equity in world affairs.</p>
                      
                      <p><strong>Shaw:</strong> Well, didn't you say to Mr. H.G. Wells that Russia was considerably Tory even yet?</p>
                      
                      <p><strong>Welles:</strong> Use the word Oriental Toryism, which is a very interesting phrase and needs a good deal of...</p>
                      
                      <p><strong>Wells:</strong> But all the same, they have every interest in the world in coming to some arrangement for the suppression of air war. They don't want it. They've got much too big a part of the earth to develop themselves, to want territory in Europe.</p>
                      
                      <p><strong>Welles:</strong> The administration of the socialist state in Russia is, after all, none of our affair. We may criticize the Org Pool, and we may not like the personality or the methods of Mr. Stalin, but the fact remains that there is happening in Russia something which is in the direction of progress.</p>
                      
                      <p>We cannot deny progress. If we do, we step backward, and stepping backward is suicide.</p>
                      
                      <p><strong>Shaw:</strong> Mr. H.G. Wells, I understand you've written a new book.</p>
                      
                      <p><strong>Wells:</strong> Yes, I've...</p>
                      
                      <p><strong>Welles:</strong> A very great book.</p>
                      
                      <p><strong>Wells:</strong> ...put a lot of... Orson's a great fellow!</p>
                      
                      <p><strong>Welles:</strong> Sensible, discerning, yes. That's true.</p>
                      
                      <p><strong>Wells:</strong> Yes, I've tried to do the mental attitude of two very clever young people, two university students, towards the world, how the world looks to them, and what problems they have to face. It's a book for the young, about the young, about the world.</p>
                      
                      <p><strong>Welles:</strong> It's a very young talk.</p>
                      
                      <p><strong>Wells:</strong> It's very... Thank you.</p>
                      
                      <p><strong>Shaw:</strong> And what is the name of your book?</p>
                      
                      <p><strong>Wells:</strong> I think for a man that I've only met in two days, Orson's a very loyal cousin of mine.</p>
                      
                      <p><strong>Shaw:</strong> Well, what is the name of the book, Mr. Wells? Babes in the Darkling Wood?</p>
                      
                      <p><strong>Wells:</strong> Babes in the Darkling Wood. Not Babes in the Wood, but Babes in the Darkling Wood, because...</p>
                      
                      <p><strong>Shaw:</strong> Is it realistic, or any fantasy in it?</p>
                      
                      <p><strong>Wells:</strong> Oh, no, it's quite realistic. They just talk away at their troubles.</p>
                      
                      <p><strong>Welles:</strong> Most of Mr. Wells' novels are realistic, but it's a misconception. It's assumed that a man who could say that the air arm of a country is the most important thing about a country in the future, that such a madman must certainly write nothing but fantasy.</p>
                      
                      <p><strong>Shaw:</strong> Well, gentlemen, it's with great reluctance that I have to say our time's up. This has been one of the real pleasures of my life.</p>
                      
                      <p>Ladies and gentlemen, you have been listening to Mr. H.G. Wells, the famous British historian and author, and Mr. Orson Welles, the theatrical genius, who met for the first time in San Antonio yesterday, and have honored us with their presence tonight. To you, Mr. H.G. Wells, and to you, Mr. Orson Welles, my heartfelt thanks for your kindness.</p>
                    </div>
                  </details>
                </div>
              </div>
            </section>

            {/* Sources Section */}
            <section 
              ref={sourcesRef}
              className="mt-8 border-t-4 border-amber-900/30 bg-amber-900/10 py-12"
            >
              <div className="px-4 sm:px-6 lg:px-8">
                <h2 className="mb-6 font-serif text-3xl font-bold text-amber-900 sm:text-4xl">
                  Works Cited
                </h2>
                <div className="space-y-2 font-serif text-sm text-amber-900/90">
                  <p>Biography.com Editors. "H.G. Wells Biography." Biography.com, A&E Television Networks, 23 June 2020, www.biography.com/authors-writers/hg-wells.</p>
                  <p>Cole, Sarah. Inventing Tomorrow: H. G. Wells and the Twentieth Century. Columbia University Press, 2019, cup.columbia.edu/book/inventing-tomorrow/9780231193122/.</p>
                  <p>Columbia Daily Spectator. 25 Oct. 1913. Columbia University Libraries Digital Collections, archive-publications.library.columbia.edu/?a=d&d=cs19131025-01.2.31.</p>
                  <p>Columbia Daily Spectator. 19 Nov. 1920. Columbia University Libraries Digital Collections, archive-publications.library.columbia.edu/?a=d&d=cs19201119-01.2.23.1.</p>
                  <p>Columbia Daily Spectator. 10 Dec. 1920. Columbia University Libraries Digital Collections, archive-publications.library.columbia.edu/?a=d&d=cs19201210-01.2.24.</p>
                  <p>Columbia Daily Spectator. 6 Aug. 1923. Columbia University Libraries Digital Collections, archive-publications.library.columbia.edu/?a=d&d=cs19230806-01.2.4.</p>
                  <p>Columbia Daily Spectator. 10 Mar. 1924. Columbia University Libraries Digital Collections, archive-publications.library.columbia.edu/?a=d&d=cs19240310-01.2.12.</p>
                  <p>Columbia Daily Spectator. 8 Dec. 1947. Columbia University Libraries Digital Collections, archive-publications.library.columbia.edu/?a=d&d=cs19471208-01.2.2.</p>
                  <p>Cone, Nathan. "When Wells Met Welles, In San Antonio." Texas Public Radio, 16 July 2020, www.tpr.org/arts-culture/2020-07-16/when-wells-met-welles-in-san-antonio.</p>
                  <p>Desmond, Adrian J. "Thomas Henry Huxley." Encyclopaedia Britannica, www.britannica.com/biography/Thomas-Henry-Huxley.</p>
                  <p>"Helen Keller: Biography." American Foundation for the Blind, www.afb.org/about-afb/history/helen-keller/biography-and-chronology/biography.</p>
                  <p>"H. G. Wells Meets Orson Welles – Parts I and II." Orson Welles on the Air, 1938–1946, Indiana University Bloomington, 28 Oct. 1940, orsonwelles.indiana.edu/items/show/2025.</p>
                  <p>"The Idea of a League of Nations." The Atlantic Monthly, vol. 123, no. 1, Jan. 1919, pp. 106–15. The Atlantic, www.theatlantic.com/past/issues/19jan/leag119.htm.</p>
                  <p>Kuiper, Kathleen. "Tono-Bungay." Encyclopaedia Britannica, britannica.com/topic/Tono-Bungay.</p>
                  <p>Morefield, Jeanne. Covenants without Swords: Idealist Liberalism and the Spirit of Empire. Princeton University Press, 2004.</p>
                  <p>"Mr. Britling Sees It Through." Encyclopaedia Britannica, www.britannica.com/topic/Mr-Britling-Sees-It-Through.</p>
                  <p>Nicholson, Norman Cornthwaite. "H.G. Wells." Encyclopaedia Britannica, 29 Oct. 2025, www.britannica.com/biography/H-G-Wells.</p>
                  <p>"Sarah Cole." The Department of English and Comparative Literature, Columbia University, english.columbia.edu/content/sarah-cole.</p>
                  <p>"Teachers College Record 1932-02: Vol. 33, Iss. 5." Teachers College Record, vol. 33, no. 5, Feb. 1932. Internet Archive, archive.org/details/sim_teachers-college-record_1932-02_33_5/page/446/mode/2up.</p>
                  <p>United States Holocaust Memorial Museum. "H.G. Wells." Holocaust Encyclopedia, encyclopedia.ushmm.org/content/en/article/hg-wells.</p>
                  <p>Wells, H. G. "Chapter III - New York." The Future in America, American Literature, AmericanLiterature.com, https://americanliterature.com/author/hg-wells/book/the-future-in-america/chapter-iii-new-york.</p>
                  <p>Wells, H. G. "Chapter XIII – The Mind of a Modern State." The Future in America: A Search After Realities, AmericanLiterature.com, americanliterature.com/author/hg-wells/book/the-future-in-america/chapter-xiii-the-mind-of-a-modern-state.</p>
                  <p>Wells, H. G. In the Fourth Year: Anticipations of a World Peace. 1918. Project Gutenberg, www.gutenberg.org/files/10291/10291-h/10291-h.htm.</p>
                  <p>Wells, H. G. The Outline of History: Being a Plain History of Life and Mankind. Edited by Ernest Barker et al., Project Gutenberg, 12 Apr. 2014, www.gutenberg.org/ebooks/45368.</p>
                  <p>Wells, H. G. The War in the Air. George Bell and Sons, 1908. Internet Archive, archive.org/details/in.ernet.dli.2015.208759.</p>
                  <p>Wells, H. G. World Brain. Foreword by Bruce Sterling, introduction by Joseph Reagle, The MIT Press, 2021, mitpress.mit.edu/9780262542562/world-brain/.</p>
                  <div className="mt-6 pt-4 border-t border-amber-900/20">
                    <h3 className="mb-2 text-base font-semibold text-amber-900">Map Data</h3>
                    <p>
                      Map tiles provided by{" "}
                      <a
                        href="https://www.openstreetmap.org/copyright"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-800 underline hover:text-amber-900"
                      >
                        OpenStreetMap
                      </a>
                      {" "}contributors
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer */}
            {/* <footer className="border-t-4 border-amber-900/30 bg-amber-900/10 py-8 mt-12">
              <div className="px-4 text-center sm:px-6 lg:px-8">
                <p className="font-serif text-amber-900/80">
                  &copy; {new Date().getFullYear()} NYC Bike Tour. Discover the stories and history of New York City.
                </p>
              </div>
            </footer> */}
          </div>
        </div>
      </main>
    </div>
  );
}
