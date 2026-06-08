"use client"

import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { Award, BookOpen, ChevronRight, Clock } from 'lucide-react'
import { useParams } from 'next/navigation'

const COURSES: Record<string, { title: string; author: string; desc: string; category: string; difficulty: string; lessons: { title: string; refs: string; content?: string }[] }> = {
  't4t': {
    title: 'T4T: Training for Trainers',
    author: 'Based on Ying Kai',
    desc: 'Every believer trains others who train others.',
    category: 'church-planting',
    difficulty: 'beginner',
    lessons: [
      { title: 'The T4T Vision: Everyone a Trainer', refs: '2 Timothy 2:2; Matthew 28:18-20' },
      { title: 'The Three-Thirds Process', refs: 'Acts 2:42-47' },
      { title: 'Looking Back: Pastoral Care', refs: 'Galatians 6:1-2; James 5:16' },
      { title: 'Looking Up: Discovery Bible Study', refs: 'Psalm 119:105; 2 Timothy 3:16-17' },
      { title: 'Looking Ahead: Practice & Goals', refs: 'Luke 10:1-3; Colossians 4:2-6' },
      { title: 'Sharing Your Story & God\'s Story', refs: 'Acts 26:1-23; 1 Peter 3:15' },
      { title: 'Tracking Generational Growth', refs: '2 Timothy 2:2; Mark 4:20' },
      { title: 'Overcoming Barriers', refs: '2 Timothy 1:7; Exodus 4:10-12' },
      { title: 'From T4T Group to Church', refs: 'Acts 2:41-47; Titus 1:5' },
    ]
  },
  '4fields': {
    title: '4 Fields: God\'s Kingdom Growing',
    author: 'Based on Nathan Shank',
    desc: 'Four stages of kingdom growth.',
    category: 'church-planting',
    difficulty: 'beginner',
    lessons: [
      { title: 'The Parable of the Sower & 4 Fields', refs: 'Mark 4:1-20' },
      { title: 'Field 1: The Empty Field — Entry', refs: 'Luke 10:1-9' },
      { title: 'Field 2: The Seeded Field — Gospel', refs: 'Romans 10:14-17' },
      { title: 'Field 3: The Growing Field — Discipleship', refs: 'Colossians 2:6-7' },
      { title: 'Field 4: The Harvest — Church Formation', refs: 'Acts 2:42-47' },
      { title: 'Leadership in the 4 Fields', refs: '2 Timothy 2:2' },
      { title: 'Multiplication: Field to Field', refs: 'Mark 4:26-32' },
      { title: 'Using 4 Fields as a Planning Tool', refs: 'Proverbs 21:5' },
    ]
  },
  'zume': {
    title: 'Zume: Multiplying Disciples',
    author: 'zumeproject.com',
    desc: 'Free training for disciple-multiplication.',
    category: 'church-planting',
    difficulty: 'beginner',
    lessons: [
      { title: 'God Uses Ordinary People', refs: '1 Corinthians 1:26-31' },
      { title: 'Simple Definition of Disciple & Church', refs: 'Matthew 28:18-20' },
      { title: 'Spiritual Breathing', refs: '1 John 1:9; Ephesians 5:18' },
      { title: 'SOAPS Bible Reading', refs: 'Joshua 1:8; Psalm 1:2-3' },
      { title: 'Accountability Groups', refs: 'Proverbs 27:17; Hebrews 3:13' },
      { title: 'Person of Peace', refs: 'Luke 10:6-7; Matthew 10:11-14' },
      { title: 'Prayer Cycle & Prayer Walking', refs: '1 Thessalonians 5:17' },
      { title: 'Three-Thirds Group', refs: 'Acts 2:42-47' },
      { title: 'Coaching & Duckling Discipleship', refs: '1 Corinthians 11:1' },
      { title: 'Vision for Multiplication', refs: '2 Timothy 2:2' },
    ]
  },
  'cpm': {
    title: 'CPM: Church Planting Movements',
    author: 'Based on David Garrison',
    desc: '10 universal elements in every CPM.',
    category: 'church-planting',
    difficulty: 'intermediate',
    lessons: [
      { title: 'What Is a CPM?', refs: 'Acts 19:10' },
      { title: 'Extraordinary Prayer', refs: 'Acts 1:14' },
      { title: 'Abundant Evangelism', refs: 'Acts 5:42' },
      { title: 'Intentional Planting', refs: '1 Cor 3:6-7' },
      { title: 'Authority of the Bible', refs: '2 Tim 3:16' },
      { title: 'Local Leadership', refs: 'Titus 1:5' },
      { title: 'Lay Leaders', refs: 'Acts 4:13' },
      { title: 'House Churches', refs: 'Romans 16:5' },
      { title: 'Churches Planting Churches', refs: '1 Thess 1:8' },
      { title: 'Rapid Reproduction', refs: 'Col 1:6' },
    ]
  },
  'dmm': {
    title: 'DMM: Disciple Making Movements',
    author: 'Based on David Watson',
    desc: 'Discovery Bible Study approach.',
    category: 'church-planting',
    difficulty: 'beginner',
    lessons: [
      { title: 'What Is a DMM?', refs: 'Matt 28:19' },
      { title: 'Discovery Bible Study', refs: 'John 5:39' },
      { title: 'Person of Peace', refs: 'Luke 10:6' },
      { title: 'Obedience-Based Discipleship', refs: 'John 14:15' },
      { title: 'Church Formation', refs: 'Acts 2:42' },
      { title: 'Leadership Development', refs: '2 Tim 2:2' },
      { title: 'Movement Principles', refs: 'Mark 4:26-29' },
    ]
  },
  'vpt': {
    title: 'VPT: Vision, Plan, Train',
    author: 'Church Planting Framework',
    desc: 'Cast vision, develop plans, train leaders.',
    category: 'church-planting',
    difficulty: 'intermediate',
    lessons: [
      { title: 'Casting Vision', refs: 'Prov 29:18' },
      { title: 'Assessing the Field', refs: 'Luke 14:28' },
      { title: 'Developing Strategy', refs: 'Neh 2:11-18' },
      { title: 'Building Teams', refs: 'Eccl 4:9-12' },
      { title: 'Training Leaders', refs: '2 Tim 2:2' },
      { title: 'Launching Churches', refs: 'Acts 13:1-3' },
      { title: 'Multiplying', refs: '2 Tim 2:2' },
      { title: 'Overcoming Obstacles', refs: 'Neh 4:1-14' },
      { title: 'Sustaining Growth', refs: 'Col 2:6-7' },
      { title: 'Movement Dynamics', refs: 'Acts 19:10' },
    ]
  },
  'dcpi-essentials': {
    title: 'DCPI: Church Planting Essentials',
    author: 'Dynamic Church Planting Intl',
    desc: '5 phases from Preparation to Multiplication.',
    category: 'church-planting',
    difficulty: 'beginner',
    lessons: [
      { title: 'The Biblical Mandate', refs: 'Matt 16:18' },
      { title: 'Phase 1: Preparation', refs: 'Luke 14:28' },
      { title: 'Phase 2: Planting', refs: '1 Cor 3:6' },
      { title: 'Phase 3: Growing', refs: 'Eph 4:15-16' },
      { title: 'Phase 4: Structuring', refs: 'Titus 1:5' },
      { title: 'Phase 5: Reproducing', refs: '2 Tim 2:2' },
      { title: 'Leadership Essentials', refs: '1 Tim 3:1-7' },
      { title: 'Multiplication Culture', refs: 'Acts 13:1-3' },
    ]
  },
  'dcpi-multiplying': {
    title: 'DCPI: Multiplying Churches Globally',
    author: 'Dynamic Church Planting Intl',
    desc: 'Reproducing churches across cultures.',
    category: 'church-planting',
    difficulty: 'advanced',
    lessons: [
      { title: 'Global Multiplication Vision', refs: 'Rev 7:9' },
      { title: 'Cross-Cultural Planting', refs: '1 Cor 9:19-23' },
      { title: 'Developing National Leaders', refs: '2 Tim 2:2' },
      { title: 'Overcoming Barriers', refs: 'Acts 16:6-10' },
      { title: 'Sustainable Models', refs: 'Phil 4:15-17' },
      { title: 'Movement Assessment', refs: 'Acts 15:36' },
    ]
  },
  'dcpi-toolkit': {
    title: 'DCPI: Church Planter\'s Toolkit',
    author: 'Dynamic Church Planting Intl',
    desc: 'Practical tools for community analysis.',
    category: 'church-planting',
    difficulty: 'intermediate',
    lessons: [
      { title: 'Community Analysis', refs: 'Neh 2:11-16' },
      { title: 'Team Building', refs: 'Eccl 4:9-12' },
      { title: 'Fundraising Basics', refs: 'Phil 4:19' },
      { title: 'Launch Planning', refs: 'Prov 21:5' },
      { title: 'First Gathering', refs: 'Acts 2:42' },
      { title: 'Growth Strategies', refs: 'Acts 2:47' },
      { title: 'Reproduction Planning', refs: '2 Tim 2:2' },
    ]
  },
  'mere-christianity': {
    title: 'Mere Christianity',
    author: 'Based on C.S. Lewis',
    desc: 'The rational case for Christian faith.',
    category: 'apologetics',
    difficulty: 'intermediate',
    lessons: [
      { title: 'Right and Wrong as a Clue', refs: 'Romans 2:14-15' },
      { title: 'What God Is Like', refs: 'John 4:24' },
      { title: 'The Shocking Alternative', refs: 'John 14:6' },
      { title: 'The Perfect Penitent', refs: 'Hebrews 9:22' },
      { title: 'Counting the Cost', refs: 'Luke 14:28' },
      { title: 'Faith', refs: 'Hebrews 11:1' },
      { title: 'The Three-Personal God', refs: 'Matthew 28:19' },
      { title: 'Is Christianity Hard or Easy?', refs: 'Matthew 11:28-30' },
    ]
  },
  'reason-for-god': {
    title: 'The Reason for God',
    author: 'Based on Timothy Keller',
    desc: 'Engaging doubts with intellectual honesty.',
    category: 'apologetics',
    difficulty: 'intermediate',
    lessons: [
      { title: 'There Can\'t Be Just One True Religion', refs: 'John 14:6' },
      { title: 'A Good God Wouldn\'t Allow Suffering', refs: 'Romans 8:28' },
      { title: 'Christianity Is a Straitjacket', refs: 'John 8:32' },
      { title: 'The Church Is Responsible for Injustice', refs: 'Matt 7:1-5' },
      { title: 'A Loving God Wouldn\'t Send People to Hell', refs: '2 Peter 3:9' },
      { title: 'Science Has Disproved Christianity', refs: 'Psalm 19:1' },
      { title: 'The Clues of God', refs: 'Romans 1:20' },
      { title: 'The Knowledge of God', refs: 'John 1:14' },
    ]
  },
  'knowing-god': {
    title: 'Knowing God',
    author: 'Based on J.I. Packer',
    desc: 'From knowing about God to knowing Him.',
    category: 'apologetics',
    difficulty: 'intermediate',
    lessons: [
      { title: 'The Study of God', refs: 'Jer 9:23-24' },
      { title: 'The People Who Know Their God', refs: 'Dan 11:32' },
      { title: 'Knowing and Being Known', refs: 'Gal 4:9' },
      { title: 'God Incarnate', refs: 'John 1:14' },
      { title: 'God\'s Wisdom', refs: 'Romans 11:33' },
      { title: 'God\'s Love', refs: '1 John 4:8' },
      { title: 'God\'s Grace', refs: 'Eph 2:8-9' },
      { title: 'The Adequacy of God', refs: '2 Cor 12:9' },
    ]
  },
  'cost-of-discipleship': {
    title: 'The Cost of Discipleship',
    author: 'Based on Dietrich Bonhoeffer',
    desc: 'Cheap grace vs costly grace.',
    category: 'discipleship',
    difficulty: 'advanced',
    lessons: [
      { title: 'Costly Grace', refs: 'Matt 13:44-46' },
      { title: 'The Call to Discipleship', refs: 'Mark 1:17' },
      { title: 'Single-Minded Obedience', refs: 'Matt 6:24' },
      { title: 'Discipleship and the Cross', refs: 'Matt 16:24' },
      { title: 'The Visible Community', refs: 'Matt 5:14-16' },
      { title: 'The Saints and the Secular', refs: 'Col 3:17' },
    ]
  },
  'foundations-of-faith': {
    title: 'Foundations of Faith',
    author: 'EmmausAI',
    desc: 'Core beliefs for new believers.',
    category: 'discipleship',
    difficulty: 'beginner',
    lessons: [
      { title: 'Who Is God?', refs: 'Gen 1:1; John 1:1' },
      { title: 'Who Is Jesus?', refs: 'Col 1:15-20' },
      { title: 'The Holy Spirit', refs: 'John 14:26' },
      { title: 'The Bible', refs: '2 Tim 3:16-17' },
      { title: 'Salvation by Grace', refs: 'Eph 2:8-9' },
      { title: 'Life in the Church', refs: 'Heb 10:24-25' },
    ]
  },
  'prayer-disciplines': {
    title: 'Prayer & Spiritual Disciplines',
    author: 'EmmausAI',
    desc: 'Building a vibrant prayer life.',
    category: 'discipleship',
    difficulty: 'beginner',
    lessons: [
      { title: 'Why Pray?', refs: 'Phil 4:6-7' },
      { title: 'The Lord\'s Prayer', refs: 'Matt 6:9-13' },
      { title: 'Listening Prayer', refs: '1 Sam 3:10' },
      { title: 'Fasting', refs: 'Matt 6:16-18' },
      { title: 'Scripture Meditation', refs: 'Josh 1:8' },
      { title: 'Solitude & Silence', refs: 'Mark 1:35' },
      { title: 'Journaling', refs: 'Psalm 77:11-12' },
      { title: 'Corporate Prayer', refs: 'Acts 4:31' },
    ]
  },
  'prayer-keller': {
    title: 'Prayer: Experiencing Awe and Intimacy',
    author: 'Based on Timothy Keller',
    desc: 'Theology and practice of prayer.',
    category: 'discipleship',
    difficulty: 'intermediate',
    lessons: [
      { title: 'The Necessity of Prayer', refs: 'Luke 18:1' },
      { title: 'What Is Prayer?', refs: 'Psalm 27:4' },
      { title: 'Learning from the Psalms', refs: 'Psalm 62:8' },
      { title: 'The Practice of Meditation', refs: 'Psalm 1:2' },
      { title: 'Prayer as Conversation', refs: 'John 15:15' },
      { title: 'Developing a Rule of Prayer', refs: 'Dan 6:10' },
    ]
  },
  'ruthless-elimination': {
    title: 'The Ruthless Elimination of Hurry',
    author: 'Based on John Mark Comer',
    desc: 'The unhurried life of Jesus.',
    category: 'discipleship',
    difficulty: 'beginner',
    lessons: [
      { title: 'The Problem of Hurry', refs: 'Psalm 46:10' },
      { title: 'The Solution of Slowing', refs: 'Mark 1:35' },
      { title: 'Silence and Solitude', refs: 'Luke 5:16' },
      { title: 'Sabbath', refs: 'Gen 2:2-3' },
      { title: 'Simplicity', refs: 'Matt 6:19-21' },
      { title: 'Presence Over Productivity', refs: 'Psalm 16:11' },
    ]
  },
  'emmaus-road': {
    title: 'The Emmaus Road: Walking with Jesus',
    author: 'EmmausAI',
    desc: 'Recognizing Jesus in everyday life.',
    category: 'discipleship',
    difficulty: 'beginner',
    lessons: [
      { title: 'The Road to Emmaus', refs: 'Luke 24:13-35' },
      { title: 'Recognizing Jesus in Scripture', refs: 'Luke 24:27' },
      { title: 'Breaking Bread Together', refs: 'Luke 24:30-31' },
      { title: 'Burning Hearts', refs: 'Luke 24:32' },
      { title: 'Testimony & Witness', refs: 'Luke 24:33-35' },
      { title: 'Daily Walking', refs: 'Micah 6:8' },
      { title: 'Community on the Road', refs: 'Heb 10:24-25' },
    ]
  },
  'prodigal-god': {
    title: 'The Prodigal God',
    author: 'Based on Timothy Keller',
    desc: 'The radical grace of the Father.',
    category: 'gospel',
    difficulty: 'beginner',
    lessons: [
      { title: 'The Two Lost Sons', refs: 'Luke 15:11-32' },
      { title: 'The Younger Brother', refs: 'Luke 15:12-20' },
      { title: 'The Elder Brother', refs: 'Luke 15:25-32' },
      { title: 'The Father\'s Love', refs: 'Luke 15:20-24' },
      { title: 'The Feast of Grace', refs: 'Luke 15:22-24' },
    ]
  },
  'meaning-of-marriage': {
    title: 'The Meaning of Marriage',
    author: 'Based on Timothy Keller',
    desc: 'Marriage as reflection of Christ\'s love.',
    category: 'christian-living',
    difficulty: 'intermediate',
    lessons: [
      { title: 'The Secret of Marriage', refs: 'Eph 5:31-32' },
      { title: 'The Power for Marriage', refs: 'Phil 2:3-4' },
      { title: 'The Essence of Marriage', refs: 'Gen 2:24' },
      { title: 'The Mission of Marriage', refs: 'Mal 2:14-15' },
      { title: 'Loving the Stranger', refs: '1 Pet 4:8' },
      { title: 'Embracing the Other', refs: '1 Cor 13:4-7' },
      { title: 'Singleness and Marriage', refs: '1 Cor 7:7' },
      { title: 'Sex and Marriage', refs: 'Song of Songs 4:9-10' },
    ]
  },
  'meaning-of-work': {
    title: 'The Meaning of Work',
    author: 'Based on Timothy Keller',
    desc: 'How the gospel transforms your work.',
    category: 'vocation',
    difficulty: 'intermediate',
    lessons: [
      { title: 'Work Matters to God', refs: 'Col 3:23-24' },
      { title: 'Work as Cultivation', refs: 'Gen 2:15' },
      { title: 'Work as Service', refs: 'Gal 5:13' },
      { title: 'Work and Idolatry', refs: 'Matt 6:24' },
      { title: 'Work and the Gospel', refs: '2 Cor 5:20' },
      { title: 'Work and Ethics', refs: 'Prov 11:1' },
      { title: 'Work and Rest', refs: 'Exodus 20:8-11' },
    ]
  },
  'purpose-driven-life': {
    title: 'The Purpose Driven Life',
    author: 'Based on Rick Warren',
    desc: 'Five purposes God has for your life.',
    category: 'christian-living',
    difficulty: 'beginner',
    lessons: [
      { title: 'It All Starts with God', refs: 'Col 1:16' },
      { title: 'You Are Not an Accident', refs: 'Psalm 139:13-16' },
      { title: 'What Drives Your Life?', refs: 'Prov 4:23' },
      { title: 'Made to Last Forever', refs: 'Eccl 3:11' },
      { title: 'Seeing Life from God\'s View', refs: '2 Cor 5:7' },
      { title: 'Planned for God\'s Pleasure', refs: 'Eph 1:5' },
      { title: 'Shaped for Serving God', refs: 'Eph 2:10' },
      { title: 'Made for a Mission', refs: 'Acts 20:24' },
    ]
  },
  'wild-at-heart': {
    title: 'Wild at Heart',
    author: 'Based on John Eldredge',
    desc: 'The passionate heart God gave every man.',
    category: 'christian-living',
    difficulty: 'beginner',
    lessons: [
      { title: 'Wild at Heart', refs: 'Gen 1:27' },
      { title: 'The Wound', refs: 'Psalm 27:10' },
      { title: 'The Battle', refs: 'Eph 6:12' },
      { title: 'The Adventure', refs: 'Josh 1:9' },
      { title: 'The Beauty', refs: 'Prov 31:30' },
      { title: 'Writing the Next Chapter', refs: 'Phil 3:13-14' },
    ]
  },
  'women-of-bible': {
    title: 'Women of the Bible: Stories of Faith',
    author: 'EmmausAI',
    desc: 'Courageous women of faith.',
    category: 'christian-living',
    difficulty: 'beginner',
    lessons: [
      { title: 'Sarah: Trusting God\'s Promise', refs: 'Gen 18:14' },
      { title: 'Ruth: Loyalty and Love', refs: 'Ruth 1:16' },
      { title: 'Esther: Courage for Such a Time', refs: 'Esther 4:14' },
      { title: 'Mary: The Handmaid of the Lord', refs: 'Luke 1:38' },
      { title: 'Mary Magdalene: First Witness', refs: 'John 20:16' },
      { title: 'Priscilla: Teaching the Way', refs: 'Acts 18:26' },
      { title: 'Hannah: Prayer and Surrender', refs: '1 Sam 1:27' },
      { title: 'Deborah: Leading with Wisdom', refs: 'Judges 4:4' },
    ]
  },
  'servant-leadership': {
    title: 'Servant Leadership: The Jesus Model',
    author: 'EmmausAI',
    desc: 'Leading like Jesus.',
    category: 'leadership',
    difficulty: 'intermediate',
    lessons: [
      { title: 'Jesus Washes Feet', refs: 'John 13:1-17' },
      { title: 'Leading by Serving', refs: 'Mark 10:42-45' },
      { title: 'Empowering Others', refs: 'Eph 4:11-12' },
      { title: 'Humility in Leadership', refs: 'Phil 2:3-8' },
      { title: 'Vision Casting', refs: 'Prov 29:18' },
      { title: 'Multiplying Leaders', refs: '2 Tim 2:2' },
    ]
  },
  'parenting': {
    title: 'Parenting with Purpose',
    author: 'EmmausAI',
    desc: 'Raising children with faith and grace.',
    category: 'family',
    difficulty: 'beginner',
    lessons: [
      { title: 'Parenting as Discipleship', refs: 'Deut 6:4-9' },
      { title: 'Grace-Based Parenting', refs: 'Eph 6:4' },
      { title: 'Teaching God\'s Word', refs: 'Prov 22:6' },
      { title: 'Modeling Faith', refs: '1 Cor 11:1' },
      { title: 'Discipline with Love', refs: 'Heb 12:5-11' },
      { title: 'Releasing & Trusting God', refs: 'Psalm 127:3-5' },
    ]
  },
  'youth-foundations': {
    title: 'Youth Foundations: Knowing God',
    author: 'EmmausAI',
    desc: 'Faith foundations for young believers.',
    category: 'family',
    difficulty: 'beginner',
    lessons: [
      { title: 'Who Is God?', refs: 'Psalm 139:1-4' },
      { title: 'Who Am I?', refs: 'Eph 2:10' },
      { title: 'The Bible', refs: 'Psalm 119:105' },
      { title: 'Prayer', refs: 'Matt 7:7-8' },
      { title: 'Community', refs: 'Heb 10:24-25' },
      { title: 'Sharing Faith', refs: '1 Pet 3:15' },
      { title: 'Handling Doubt', refs: 'Mark 9:24' },
      { title: 'Living It Out', refs: 'James 1:22' },
    ]
  },
  'gospel-of-john': {
    title: 'The Gospel of John: Encountering Jesus',
    author: 'Bible Study',
    desc: 'Meeting Jesus through John\'s account.',
    category: 'bible-books',
    difficulty: 'beginner',
    lessons: [
      { title: 'In the Beginning Was the Word', refs: 'John 1:1-18' },
      { title: 'Water into Wine', refs: 'John 2:1-11' },
      { title: 'You Must Be Born Again', refs: 'John 3:1-21' },
      { title: 'The Woman at the Well', refs: 'John 4:1-42' },
      { title: 'The Bread of Life', refs: 'John 6:25-59' },
      { title: 'The Light of the World', refs: 'John 8:12-30' },
      { title: 'The Good Shepherd', refs: 'John 10:1-18' },
      { title: 'The Raising of Lazarus', refs: 'John 11:1-44' },
      { title: 'The Farewell Discourse', refs: 'John 14:1-31' },
      { title: 'The High Priestly Prayer', refs: 'John 17:1-26' },
      { title: 'The Cross and Resurrection', refs: 'John 19-20' },
      { title: 'Do You Love Me?', refs: 'John 21:15-25' },
    ]
  },
  'romans': {
    title: 'Romans: The Heart of the Gospel',
    author: 'Bible Study',
    desc: 'Grace, justification, and new life.',
    category: 'bible-books',
    difficulty: 'intermediate',
    lessons: [
      { title: 'The Gospel Revealed', refs: 'Rom 1:16-17' },
      { title: 'The Human Problem', refs: 'Rom 3:9-20' },
      { title: 'Justification by Faith', refs: 'Rom 3:21-31' },
      { title: 'Peace with God', refs: 'Rom 5:1-11' },
      { title: 'Dead to Sin', refs: 'Rom 6:1-14' },
      { title: 'The Struggle Within', refs: 'Rom 7:14-25' },
      { title: 'Life in the Spirit', refs: 'Rom 8:1-17' },
      { title: 'Nothing Separates Us', refs: 'Rom 8:28-39' },
      { title: 'Living Sacrifices', refs: 'Rom 12:1-2' },
      { title: 'Love Fulfills the Law', refs: 'Rom 13:8-14' },
    ]
  },
  'genesis': {
    title: 'Genesis: In the Beginning',
    author: 'Bible Study',
    desc: 'Creation, fall, promise.',
    category: 'bible-books',
    difficulty: 'beginner',
    lessons: [
      { title: 'Creation', refs: 'Gen 1:1-31' },
      { title: 'The Image of God', refs: 'Gen 1:26-28' },
      { title: 'The Fall', refs: 'Gen 3:1-24' },
      { title: 'Cain and Abel', refs: 'Gen 4:1-16' },
      { title: 'Noah and the Flood', refs: 'Gen 6-9' },
      { title: 'The Tower of Babel', refs: 'Gen 11:1-9' },
      { title: 'Abraham\'s Call', refs: 'Gen 12:1-9' },
      { title: 'The Covenant', refs: 'Gen 15:1-21' },
      { title: 'Isaac and Sacrifice', refs: 'Gen 22:1-19' },
      { title: 'Joseph: God\'s Sovereignty', refs: 'Gen 50:20' },
    ]
  },
  'psalms': {
    title: 'Psalms: The Prayer & Worship Book',
    author: 'Bible Study',
    desc: 'Ancient prayers for every emotion.',
    category: 'bible-books',
    difficulty: 'beginner',
    lessons: [
      { title: 'The Two Ways', refs: 'Psalm 1' },
      { title: 'The Good Shepherd', refs: 'Psalm 23' },
      { title: 'Create in Me a Clean Heart', refs: 'Psalm 51' },
      { title: 'God Our Refuge', refs: 'Psalm 46' },
      { title: 'Praise the Lord', refs: 'Psalm 100' },
      { title: 'The Word Is a Lamp', refs: 'Psalm 119:105-112' },
      { title: 'Where Can I Go?', refs: 'Psalm 139' },
      { title: 'Out of the Depths', refs: 'Psalm 130' },
      { title: 'Let Everything Praise', refs: 'Psalm 150' },
      { title: 'The Heavens Declare', refs: 'Psalm 19' },
    ]
  },
  'biblical-evangelism': {
    title: 'Biblical Evangelism in the Digital Age',
    author: 'EmmausAI',
    desc: 'Sharing faith online and offline.',
    category: 'missions',
    difficulty: 'beginner',
    lessons: [
      { title: 'The Great Commission Today', refs: 'Matt 28:19-20' },
      { title: 'Your Personal Testimony', refs: 'Acts 26:1-23' },
      { title: 'Listening & Asking Questions', refs: 'Col 4:5-6' },
      { title: 'Digital Platforms for Gospel', refs: 'Rom 10:14-15' },
      { title: 'Overcoming Fear', refs: '2 Tim 1:7' },
    ]
  },
  'financial-stewardship': {
    title: 'Biblical Financial Stewardship',
    author: 'EmmausAI',
    desc: 'Managing money God\'s way.',
    category: 'christian-living',
    difficulty: 'beginner',
    lessons: [
      { title: 'God Owns Everything', refs: 'Psalm 24:1' },
      { title: 'Contentment', refs: 'Phil 4:11-13' },
      { title: 'Generous Giving', refs: '2 Cor 9:6-8' },
      { title: 'Avoiding Debt', refs: 'Prov 22:7' },
      { title: 'Saving Wisely', refs: 'Prov 21:20' },
      { title: 'Eternal Investment', refs: 'Matt 6:19-21' },
    ]
  },
  'nations-be-glad': {
    title: 'Let the Nations Be Glad',
    author: 'Based on John Piper',
    desc: 'Global missions and the unreached.',
    category: 'missions',
    difficulty: 'intermediate',
    lessons: [
      { title: 'The Supremacy of God in Missions', refs: 'Psalm 67:1-7' },
      { title: 'Worship: The Goal of Missions', refs: 'Rev 7:9-10' },
      { title: 'The Necessity of the Gospel', refs: 'Rom 10:13-15' },
      { title: 'Suffering in Missions', refs: '2 Cor 4:7-18' },
      { title: 'Prayer: The Power of Missions', refs: 'Matt 9:37-38' },
      { title: 'Sending and Going', refs: 'Isa 6:8' },
    ]
  },
  'vce-religion-society': {
    title: 'VCE Religion and Society',
    author: 'VCAA Study Design',
    desc: 'Explore the role of religion in society, ethics, and social justice.',
    category: 'vce',
    difficulty: 'intermediate',
    lessons: [
      { title: 'Unit 1: The Role of Religion in Society', refs: 'VCAA Study Design 2024' },
      { title: 'Unit 1: Religion and Ethics', refs: 'VCAA Study Design 2024' },
      { title: 'Unit 2: Religion and the Human Experience', refs: 'VCAA Study Design 2024' },
      { title: 'Unit 2: Religion, Challenge and Change', refs: 'VCAA Study Design 2024' },
      { title: 'Unit 3: The Search for Meaning', refs: 'VCAA Study Design 2024' },
      { title: 'Unit 3: Ethics and Moral Decision-Making', refs: 'VCAA Study Design 2024' },
      { title: 'Unit 4: Religion and Social Justice', refs: 'VCAA Study Design 2024' },
      { title: 'Unit 4: Religion, Diversity and Harmony', refs: 'VCAA Study Design 2024' },
    
      { title: 'Exam Practice: 2023 Paper', refs: 'VCAA Past Exam 2023' },
      { title: 'Exam Practice: 2022 Paper', refs: 'VCAA Past Exam 2022' },
      { title: 'Exam Practice: 2021 Paper', refs: 'VCAA Past Exam 2021' },
      { title: 'Exam Practice: 2020 Paper', refs: 'VCAA Past Exam 2020' },
      { title: 'Exam Practice: 2019 Paper', refs: 'VCAA Past Exam 2019' },
    
      { title: 'Exam Practice: 2018 Paper', refs: 'VCAA Past Exam 2018' },
      { title: 'Exam Practice: 2017 Paper', refs: 'VCAA Past Exam 2017' },
      { title: 'Exam Practice: 2016 Paper', refs: 'VCAA Past Exam 2016' },
      { title: 'Examiner Report & Key Findings', refs: 'VCAA Examiner Reports 2016-2023' },
    ]
  },
  'vce-texts-traditions': {
    title: 'VCE Texts and Traditions',
    author: 'VCAA Study Design',
    desc: 'Study sacred texts and their interpretation across religious traditions.',
    category: 'vce',
    difficulty: 'intermediate',
    lessons: [
      { title: 'Unit 1: Texts in Traditions', refs: 'VCAA Study Design 2024' },
      { title: 'Unit 1: Texts in Society', refs: 'VCAA Study Design 2024' },
      { title: 'Unit 2: Texts and the Search for Meaning', refs: 'VCAA Study Design 2024' },
      { title: 'Unit 2: Texts and Human Experience', refs: 'VCAA Study Design 2024' },
      { title: 'Unit 3: Sacred Texts and their Contexts', refs: 'VCAA Study Design 2024' },
      { title: 'Unit 3: Interpreting Texts', refs: 'VCAA Study Design 2024' },
      { title: 'Unit 4: Texts and Issues in Society', refs: 'VCAA Study Design 2024' },
      { title: 'Unit 4: Texts and Ethical Living', refs: 'VCAA Study Design 2024' },
    
      { title: 'Exam Practice: 2023 Paper', refs: 'VCAA Past Exam 2023' },
      { title: 'Exam Practice: 2022 Paper', refs: 'VCAA Past Exam 2022' },
      { title: 'Exam Practice: 2021 Paper', refs: 'VCAA Past Exam 2021' },
      { title: 'Exam Practice: 2020 Paper', refs: 'VCAA Past Exam 2020' },
      { title: 'Exam Practice: 2019 Paper', refs: 'VCAA Past Exam 2019' },
    
      { title: 'Exam Practice: 2018 Paper', refs: 'VCAA Past Exam 2018' },
      { title: 'Exam Practice: 2017 Paper', refs: 'VCAA Past Exam 2017' },
      { title: 'Exam Practice: 2016 Paper', refs: 'VCAA Past Exam 2016' },
      { title: 'Examiner Report & Key Findings', refs: 'VCAA Examiner Reports 2016-2023' },
    ]
  },
  'vce-philosophy': {
    title: 'VCE Philosophy',
    author: 'VCAA Study Design',
    desc: 'Examine fundamental questions about knowledge, existence, and ethics.',
    category: 'vce',
    difficulty: 'advanced',
    lessons: [
      { title: 'Unit 1: Existence, Knowledge and Reasoning', refs: 'VCAA Study Design 2024' },
      { title: 'Unit 1: Questions of Value', refs: 'VCAA Study Design 2024' },
      { title: 'Unit 2: The Good Life', refs: 'VCAA Study Design 2024' },
      { title: 'Unit 2: Minds, Bodies and Persons', refs: 'VCAA Study Design 2024' },
      { title: 'Unit 3: Minds, Bodies and Persons', refs: 'VCAA Study Design 2024' },
      { title: 'Unit 3: The Good Life and Ethics', refs: 'VCAA Study Design 2024' },
      { title: 'Unit 4: The Examined Life', refs: 'VCAA Study Design 2024' },
      { title: 'Unit 4: Justice and Society', refs: 'VCAA Study Design 2024' },
    
      { title: 'Exam Practice: 2023 Paper', refs: 'VCAA Past Exam 2023' },
      { title: 'Exam Practice: 2022 Paper', refs: 'VCAA Past Exam 2022' },
      { title: 'Exam Practice: 2021 Paper', refs: 'VCAA Past Exam 2021' },
      { title: 'Exam Practice: 2020 Paper', refs: 'VCAA Past Exam 2020' },
      { title: 'Exam Practice: 2019 Paper', refs: 'VCAA Past Exam 2019' },
    
      { title: 'Exam Practice: 2018 Paper', refs: 'VCAA Past Exam 2018' },
      { title: 'Exam Practice: 2017 Paper', refs: 'VCAA Past Exam 2017' },
      { title: 'Exam Practice: 2016 Paper', refs: 'VCAA Past Exam 2016' },
      { title: 'Examiner Report & Key Findings', refs: 'VCAA Examiner Reports 2016-2023' },
    ]
  },
  'vce-english': {
    title: 'VCE English',
    author: 'VCAA Study Design',
    desc: 'Develop analytical and creative responses to texts.',
    category: 'vce',
    difficulty: 'intermediate',
    lessons: [
      { title: 'Unit 1: Reading and Responding', refs: 'VCAA Study Design 2024' },
      { title: 'Unit 1: Creating Texts', refs: 'VCAA Study Design 2024' },
      { title: 'Unit 2: Reading and Comparing Texts', refs: 'VCAA Study Design 2024' },
      { title: 'Unit 2: Crafting Texts', refs: 'VCAA Study Design 2024' },
      { title: 'Unit 3: Reading and Creating Texts', refs: 'VCAA Study Design 2024' },
      { title: 'Unit 3: Analysing Argument', refs: 'VCAA Study Design 2024' },
      { title: 'Unit 4: Reading and Comparing Texts', refs: 'VCAA Study Design 2024' },
      { title: 'Unit 4: Presenting Argument', refs: 'VCAA Study Design 2024' },
    
      { title: 'Exam Practice: 2023 Paper', refs: 'VCAA Past Exam 2023' },
      { title: 'Exam Practice: 2022 Paper', refs: 'VCAA Past Exam 2022' },
      { title: 'Exam Practice: 2021 Paper', refs: 'VCAA Past Exam 2021' },
      { title: 'Exam Practice: 2020 Paper', refs: 'VCAA Past Exam 2020' },
      { title: 'Exam Practice: 2019 Paper', refs: 'VCAA Past Exam 2019' },
    
      { title: 'Exam Practice: 2018 Paper', refs: 'VCAA Past Exam 2018' },
      { title: 'Exam Practice: 2017 Paper', refs: 'VCAA Past Exam 2017' },
      { title: 'Exam Practice: 2016 Paper', refs: 'VCAA Past Exam 2016' },
      { title: 'Examiner Report & Key Findings', refs: 'VCAA Examiner Reports 2016-2023' },
    ]
  },
  'vce-maths-methods': {
    title: 'VCE Mathematical Methods',
    author: 'VCAA Study Design',
    desc: 'Functions, calculus, algebra, probability and statistics.',
    category: 'vce',
    difficulty: 'advanced',
    lessons: [
      { title: 'Unit 1: Functions and Graphs', refs: 'VCAA Study Design 2024' },
      { title: 'Unit 1: Algebra, Number and Structure', refs: 'VCAA Study Design 2024' },
      { title: 'Unit 2: Calculus — Rates of Change', refs: 'VCAA Study Design 2024' },
      { title: 'Unit 2: Probability and Statistics', refs: 'VCAA Study Design 2024' },
      { title: 'Unit 3: Functions and Calculus', refs: 'VCAA Study Design 2024' },
      { title: 'Unit 3: Algebra and Applications', refs: 'VCAA Study Design 2024' },
      { title: 'Unit 4: Probability and Statistical Inference', refs: 'VCAA Study Design 2024' },
      { title: 'Unit 4: Integration and Applications', refs: 'VCAA Study Design 2024' },
    
      { title: 'Exam Practice: 2023 Paper 1 (Technology-Free)', refs: 'VCAA Past Exam 2023' },
      { title: 'Exam Practice: 2023 Paper 2 (Technology-Active)', refs: 'VCAA Past Exam 2023' },
      { title: 'Exam Practice: 2022 Papers', refs: 'VCAA Past Exam 2022' },
      { title: 'Exam Practice: 2021 Papers', refs: 'VCAA Past Exam 2021' },
      { title: 'Exam Practice: 2020 Papers', refs: 'VCAA Past Exam 2020' },
    
      { title: 'Exam Practice: 2018 Paper 1', refs: 'VCAA Past Exam 2018' },
      { title: 'Exam Practice: 2018 Paper 2', refs: 'VCAA Past Exam 2018' },
      { title: 'Exam Practice: 2017 Papers', refs: 'VCAA Past Exam 2017' },
      { title: 'Exam Practice: 2016 Papers', refs: 'VCAA Past Exam 2016' },
      { title: 'Examiner Report & Key Findings', refs: 'VCAA Examiner Reports 2016-2023' },
    ]
  },
  'vce-biology': {
    title: 'VCE Biology',
    author: 'VCAA Study Design',
    desc: 'From cells to ecosystems — molecular biology, genetics, and evolution.',
    category: 'vce',
    difficulty: 'intermediate',
    lessons: [
      { title: 'Unit 1: How Do Cells Function?', refs: 'VCAA Study Design 2024' },
      { title: 'Unit 1: How Do Plant and Animal Systems Function?', refs: 'VCAA Study Design 2024' },
      { title: 'Unit 2: How Is Inheritance Explained?', refs: 'VCAA Study Design 2024' },
      { title: 'Unit 2: How Do Organisms Change Over Time?', refs: 'VCAA Study Design 2024' },
      { title: 'Unit 3: How Do Cells Maintain Life?', refs: 'VCAA Study Design 2024' },
      { title: 'Unit 3: How Is Biological Diversity Generated?', refs: 'VCAA Study Design 2024' },
      { title: 'Unit 4: How Does Life Change and Respond?', refs: 'VCAA Study Design 2024' },
      { title: 'Unit 4: How Is Continuity of Life Maintained?', refs: 'VCAA Study Design 2024' },
    
      { title: 'Exam Practice: 2023 Paper', refs: 'VCAA Past Exam 2023' },
      { title: 'Exam Practice: 2022 Paper', refs: 'VCAA Past Exam 2022' },
      { title: 'Exam Practice: 2021 Paper', refs: 'VCAA Past Exam 2021' },
      { title: 'Exam Practice: 2020 Paper', refs: 'VCAA Past Exam 2020' },
      { title: 'Exam Practice: 2019 Paper', refs: 'VCAA Past Exam 2019' },
    
      { title: 'Exam Practice: 2018 Paper', refs: 'VCAA Past Exam 2018' },
      { title: 'Exam Practice: 2017 Paper', refs: 'VCAA Past Exam 2017' },
      { title: 'Exam Practice: 2016 Paper', refs: 'VCAA Past Exam 2016' },
      { title: 'Examiner Report & Key Findings', refs: 'VCAA Examiner Reports 2016-2023' },
    ]
  },
  'vce-psychology': {
    title: 'VCE Psychology',
    author: 'VCAA Study Design',
    desc: 'The science of behaviour and mental processes.',
    category: 'vce',
    difficulty: 'intermediate',
    lessons: [
      { title: 'Unit 1: How Are Behaviour and Mental Processes Shaped?', refs: 'VCAA Study Design 2024' },
      { title: 'Unit 1: Brain and Nervous System', refs: 'VCAA Study Design 2024' },
      { title: 'Unit 2: How Do External Factors Influence Behaviour?', refs: 'VCAA Study Design 2024' },
      { title: 'Unit 2: Individual Differences in Behaviour', refs: 'VCAA Study Design 2024' },
      { title: 'Unit 3: How Does the Nervous System Enable Behaviour?', refs: 'VCAA Study Design 2024' },
      { title: 'Unit 3: How Do People Learn and Remember?', refs: 'VCAA Study Design 2024' },
      { title: 'Unit 4: How Is Wellbeing Developed and Maintained?', refs: 'VCAA Study Design 2024' },
      { title: 'Unit 4: How Does Experience Affect Behaviour?', refs: 'VCAA Study Design 2024' },
    
      { title: 'Exam Practice: 2023 Paper', refs: 'VCAA Past Exam 2023' },
      { title: 'Exam Practice: 2022 Paper', refs: 'VCAA Past Exam 2022' },
      { title: 'Exam Practice: 2021 Paper', refs: 'VCAA Past Exam 2021' },
      { title: 'Exam Practice: 2020 Paper', refs: 'VCAA Past Exam 2020' },
      { title: 'Exam Practice: 2019 Paper', refs: 'VCAA Past Exam 2019' },
    
      { title: 'Exam Practice: 2018 Paper', refs: 'VCAA Past Exam 2018' },
      { title: 'Exam Practice: 2017 Paper', refs: 'VCAA Past Exam 2017' },
      { title: 'Exam Practice: 2016 Paper', refs: 'VCAA Past Exam 2016' },
      { title: 'Examiner Report & Key Findings', refs: 'VCAA Examiner Reports 2016-2023' },
    ]
  },
  'vce-history-revolutions': {
    title: 'VCE History: Revolutions',
    author: 'VCAA Study Design',
    desc: 'Causes and consequences of significant revolutions.',
    category: 'vce',
    difficulty: 'advanced',
    lessons: [
      { title: 'Unit 3: French Revolution — Causes', refs: 'VCAA Study Design 2024' },
      { title: 'Unit 3: French Revolution — Consequences', refs: 'VCAA Study Design 2024' },
      { title: 'Unit 3: Russian Revolution — Causes', refs: 'VCAA Study Design 2024' },
      { title: 'Unit 3: Russian Revolution — Consequences', refs: 'VCAA Study Design 2024' },
      { title: 'Unit 4: American Revolution — Causes', refs: 'VCAA Study Design 2024' },
      { title: 'Unit 4: American Revolution — Consequences', refs: 'VCAA Study Design 2024' },
      { title: 'Unit 4: Chinese Revolution — Causes', refs: 'VCAA Study Design 2024' },
      { title: 'Unit 4: Chinese Revolution — Consequences', refs: 'VCAA Study Design 2024' },
    
      { title: 'Exam Practice: 2023 Paper', refs: 'VCAA Past Exam 2023' },
      { title: 'Exam Practice: 2022 Paper', refs: 'VCAA Past Exam 2022' },
      { title: 'Exam Practice: 2021 Paper', refs: 'VCAA Past Exam 2021' },
      { title: 'Exam Practice: 2020 Paper', refs: 'VCAA Past Exam 2020' },
      { title: 'Exam Practice: 2019 Paper', refs: 'VCAA Past Exam 2019' },
    
      { title: 'Exam Practice: 2018 Paper', refs: 'VCAA Past Exam 2018' },
      { title: 'Exam Practice: 2017 Paper', refs: 'VCAA Past Exam 2017' },
      { title: 'Exam Practice: 2016 Paper', refs: 'VCAA Past Exam 2016' },
      { title: 'Examiner Report & Key Findings', refs: 'VCAA Examiner Reports 2016-2023' },
    ]
  },
}

export default function CourseDetailPage() {
  const t = useTranslations('courseDetail')
  const params = useParams()
  const courseId = params.id as string
  const course = COURSES[courseId]
  const locale = useLocale()
  const cn = useTranslations('courseNames')
  const getCourseTitle = () => { try { const v = cn(`${courseId}.title`); return v.includes('.title') ? course?.title : v } catch { return course?.title } }
  const getCourseDesc = () => { try { const v = cn(`${courseId}.desc`); return v.includes('.desc') ? course?.desc : v } catch { return course?.desc } }
  const ln = useTranslations('lessonNames')
  const getLessonTitle = (idx: number) => { try { const v = ln(`${courseId}.${idx}`); return v.includes(`${courseId}.`) ? course?.lessons[idx]?.title : v } catch { return course?.lessons[idx]?.title } }

  if (!course) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <BookOpen className="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <h1 className="text-2xl font-bold text-secondary-900 mb-2">{t('notFound')}</h1>
        <p className="text-gray-600 mb-6">{t('notFoundDesc')}</p>
        <Link href="/courses" className="text-primary-700 hover:underline font-medium">
          &larr; {t('backToCourses')}
        </Link>
      </div>
    )
  }

  const diffColor: Record<string, string> = {
    beginner: 'bg-green-100 text-green-700',
    intermediate: 'bg-yellow-100 text-yellow-700',
    advanced: 'bg-red-100 text-red-700',
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/courses" className="hover:text-primary-700 transition">{t('courses')}</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-secondary-900 font-medium">{getCourseTitle()}</span>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-br from-secondary-800 to-secondary-900 rounded-2xl p-8 text-white mb-8">
        <span className={`inline-block text-xs px-2.5 py-1 rounded-full font-medium mb-3 ${diffColor[course.difficulty]}`}>
          {course.difficulty}
        </span>
        <h1 className="text-3xl font-bold mb-2">{getCourseTitle()}</h1>
        <p className="text-primary-200 text-sm mb-3">{course.author}</p>
        <p className="text-gray-300 mb-6">{course.desc}</p>
        
        <div className="flex items-center gap-6 text-sm text-gray-300">
          <span className="flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" /> {course.lessons.length} {t('lessons')}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" /> ~{course.lessons.length * 15} {t('minutes')}
          </span>
          <span className="flex items-center gap-1.5">
            <Award className="w-4 h-4" /> {t('certificate')}
          </span>
        </div>
        
        <Link href={`/courses/${courseId}/1`} className="mt-6 inline-block px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition text-sm shadow-lg">
          {t('startCourse')} &rarr;
        </Link>
      </div>

      {/* Lesson List */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-secondary-900 mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary-600" />
          {t('lessonPlan')}
        </h2>
        <div className="space-y-3">
          {course.lessons.map((lesson, i) => (
            <Link key={i} href={`/courses/${courseId}/${i + 1}`} className="block bg-white border border-gray-100 rounded-xl p-4 hover:shadow-md hover:border-primary-200 transition group">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-bold text-sm">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-secondary-900 group-hover:text-primary-700 transition text-sm">
                    {getLessonTitle(i) || lesson.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">{lesson.content}</p>
                  <p className="text-xs text-primary-600 mt-1 font-mono">{lesson.refs}</p>
                </div>
                <div className="flex-shrink-0">
                  {i === 0 ? (
                    <span className="text-xs bg-primary-500 text-white px-3 py-1 rounded-full font-medium">
                      {t('start')}
                    </span>
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-primary-500 transition" />
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-primary-50 border border-primary-100 rounded-xl p-6 text-center">
        <h3 className="font-bold text-secondary-900 mb-2">{t('readyToStart')}</h3>
        <p className="text-sm text-gray-600 mb-4">{t('signUpPrompt')}</p>
        <div className="flex gap-3 justify-center">
          <Link href="/register" className="px-6 py-2.5 bg-secondary-600 text-white rounded-lg font-medium hover:bg-secondary-700 transition text-sm">
            {t('createAccount')}
          </Link>
          <Link href="/login" className="px-6 py-2.5 border border-secondary-300 text-secondary-700 rounded-lg font-medium hover:bg-white transition text-sm">
            {t('signIn')}
          </Link>
        </div>
      </div>
    </div>
  )
}
