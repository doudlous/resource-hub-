import React, { useState } from 'react';
import { CommunityEvent, ForumQuestion } from '../../types';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  MessageSquare, 
  ThumbsUp, 
  CheckCircle, 
  Send, 
  Sparkles,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

interface CommunityEventsProps {
  events: CommunityEvent[];
  forumPosts: ForumQuestion[];
  onAddForumQuestion: (q: Omit<ForumQuestion, 'id' | 'upvotes' | 'answersCount' | 'answers'>) => void;
  onUpvoteForumPost: (id: string) => void;
  onAddForumAnswer: (postId: string, answerText: string) => void;
  globalSearchQuery: string;
}

export const CommunityEvents: React.FC<CommunityEventsProps> = ({
  events,
  forumPosts,
  onAddForumQuestion,
  onUpvoteForumPost,
  onAddForumAnswer,
  globalSearchQuery,
}) => {
  const [activeTab, setActiveTab] = useState<'events' | 'forum'>('events');
  const [rsvpSuccessMap, setRsvpSuccessMap] = useState<Record<string, boolean>>({});

  // Question submission form state
  const [showAskForm, setShowAskForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Industrial Attachment');
  const [newAuthor, setNewAuthor] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newUniversity, setNewUniversity] = useState('University of Nairobi (UoN)');
  const [newContent, setNewContent] = useState('');

  // Answer state for expanded questions
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);
  const [replyTextMap, setReplyTextMap] = useState<Record<string, string>>({});

  const handleRSVP = (eventId: string) => {
    setRsvpSuccessMap((prev) => ({ ...prev, [eventId]: true }));
  };

  const handlePostQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    onAddForumQuestion({
      title: newTitle.trim(),
      author: newAuthor.trim() || 'Comrade Student',
      authorRole: newRole.trim() || 'Continuing Undergraduate',
      university: newUniversity,
      timestamp: 'Just now',
      category: newCategory,
      content: newContent.trim(),
    });

    setNewTitle('');
    setNewContent('');
    setShowAskForm(false);
  };

  const handleSendAnswer = (postId: string) => {
    const text = replyTextMap[postId];
    if (!text || !text.trim()) return;

    onAddForumAnswer(postId, text.trim());
    setReplyTextMap((prev) => ({ ...prev, [postId]: '' }));
  };

  const filteredEvents = events.filter((ev) => {
    if (globalSearchQuery.trim()) {
      const q = globalSearchQuery.toLowerCase();
      return (
        ev.title.toLowerCase().includes(q) ||
        ev.organizer.toLowerCase().includes(q) ||
        ev.venue.toLowerCase().includes(q) ||
        ev.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const filteredPosts = forumPosts.filter((p) => {
    if (globalSearchQuery.trim()) {
      const q = globalSearchQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.university.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Page Title & Context Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="text-xs font-semibold text-blue-700 tracking-wide uppercase mb-1">
            Campus Ecosystem & Comrade Network
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Events & Student Discussion Forum
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Connect with Google Developer Student Clubs, tech summits, NITA mentorship sessions, and campus peer Q&A.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="flex items-center p-1 bg-slate-100 rounded-lg text-xs font-semibold">
            <button
              onClick={() => setActiveTab('events')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'events' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
              }`}
            >
              Campus Events ({filteredEvents.length})
            </button>
            <button
              onClick={() => setActiveTab('forum')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'forum' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
              }`}
            >
              Comrade Q&A ({filteredPosts.length})
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* VIEW 1: EVENTS */}
      {/* ========================================================= */}
      {activeTab === 'events' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredEvents.map((event) => {
              const hasRsvpd = Boolean(rsvpSuccessMap[event.id]);

              return (
                <div
                  key={event.id}
                  className="bg-white p-5 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-xs transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                      <div className="flex items-center gap-2 truncate">
                        <span className="font-semibold text-blue-700">{event.organizer}</span>
                        <span aria-hidden="true">·</span>
                        <span>{event.type}</span>
                      </div>

                      <span className="font-mono text-emerald-700 text-xs font-semibold">
                        {hasRsvpd ? 'RSVP Confirmed' : `${event.spotsRemaining} spots left`}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                      {event.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {event.description}
                    </p>

                    <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-blue-600" />
                        <span className="font-medium text-slate-800">{event.date}</span>
                        <span aria-hidden="true">·</span>
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{event.venue}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div className="text-slate-500 text-[11px] truncate max-w-[200px]">
                      Speakers: {event.speakers.join(', ')}
                    </div>

                    <button
                      onClick={() => handleRSVP(event.id)}
                      disabled={hasRsvpd}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                        hasRsvpd
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 cursor-default'
                          : 'bg-blue-600 hover:bg-blue-700 text-white shadow-2xs'
                      }`}
                    >
                      {hasRsvpd ? (
                        <>
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                          <span>RSVP Saved</span>
                        </>
                      ) : (
                        <>
                          <span>Reserve Free Spot</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* VIEW 2: FORUM & PEER ADVICE */}
      {/* ========================================================= */}
      {activeTab === 'forum' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-blue-50/60 p-4 rounded-xl border border-blue-100">
            <div>
              <h2 className="text-sm font-bold text-blue-950">Got a question on NITA, HELB appeals, or campus units?</h2>
              <p className="text-xs text-blue-800 mt-0.5">
                Ask thousands of continuing students and verified university alumni across Kenya.
              </p>
            </div>

            <button
              onClick={() => setShowAskForm(!showAskForm)}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors shrink-0 whitespace-nowrap self-start sm:self-auto"
            >
              {showAskForm ? 'Close Question Form' : 'Ask a Question'}
            </button>
          </div>

          {/* Ask Form */}
          {showAskForm && (
            <form onSubmit={handlePostQuestion} className="bg-white p-5 rounded-xl border border-blue-200 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-slate-900">Post a Comrade Question</h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mercy Wawira"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Year / Program</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2nd Year Actuarial Science"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">University</label>
                  <select
                    value={newUniversity}
                    onChange={(e) => setNewUniversity(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                  >
                    <option value="University of Nairobi (UoN)">University of Nairobi (UoN)</option>
                    <option value="Kenyatta University (KU)">Kenyatta University (KU)</option>
                    <option value="JKUAT Main Campus">JKUAT Main Campus</option>
                    <option value="Strathmore University">Strathmore University</option>
                    <option value="Moi University">Moi University</option>
                    <option value="Other Kenyan Campus">Other Kenyan Campus</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Question Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Where do I get the NITA attachment insurance certificate in Nairobi?"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Details & Context</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Provide background info so comrades can give you exact actionable advice..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAskForm(false)}
                  className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs"
                >
                  Publish Question
                </button>
              </div>
            </form>
          )}

          {/* Posts list */}
          <div className="space-y-4">
            {filteredPosts.map((post) => {
              const isExpanded = expandedQuestionId === post.id;

              return (
                <div
                  key={post.id}
                  className="bg-white p-5 rounded-xl border border-slate-200 hover:border-slate-300 transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5">
                        <span className="font-semibold text-slate-900">{post.author}</span>
                        <span aria-hidden="true">·</span>
                        <span>{post.authorRole}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-blue-900 font-medium">{post.university}</span>
                        <span aria-hidden="true">·</span>
                        <span>{post.timestamp}</span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 leading-snug">
                        {post.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">
                        {post.content}
                      </p>
                    </div>

                    <button
                      onClick={() => onUpvoteForumPost(post.id)}
                      className="flex flex-col items-center justify-center p-2 rounded-lg bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-700 transition-colors shrink-0"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-xs font-mono font-bold mt-1 tabular-nums">{post.upvotes}</span>
                    </button>
                  </div>

                  {/* Question Bottom controls */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                    <button
                      onClick={() => setExpandedQuestionId(isExpanded ? null : post.id)}
                      className="text-blue-700 font-semibold hover:underline flex items-center gap-1"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{post.answers.length} Responses {isExpanded ? '(Hide)' : '(View)'}</span>
                    </button>

                    <span className="text-slate-400 font-mono text-[11px]">{post.category}</span>
                  </div>

                  {/* Expanded answers */}
                  {isExpanded && (
                    <div className="pt-3 border-t border-slate-100 space-y-3 bg-slate-50/70 p-3.5 rounded-lg">
                      <div className="text-xs font-bold text-slate-700">Comrade Responses & Advice:</div>

                      {post.answers.length === 0 ? (
                        <div className="text-xs text-slate-500 italic">No responses yet. Be the first comrade to answer!</div>
                      ) : (
                        post.answers.map((ans) => (
                          <div key={ans.id} className="bg-white p-3 rounded-lg border border-slate-200 text-xs space-y-1.5">
                            <div className="flex items-center justify-between text-slate-500">
                              <div className="flex items-center gap-1.5 font-medium text-slate-900">
                                <span>{ans.author}</span>
                                <span className="text-[11px] text-slate-400 font-normal">({ans.university})</span>
                              </div>
                              <span className="text-[11px]">{ans.timestamp}</span>
                            </div>

                            <p className="text-slate-700 leading-relaxed">{ans.content}</p>

                            {ans.isAccepted && (
                              <div className="text-emerald-700 text-[11px] font-semibold flex items-center gap-1 pt-1">
                                <CheckCircle className="w-3 h-3" />
                                <span>Verified Community Solution</span>
                              </div>
                            )}
                          </div>
                        ))
                      )}

                      {/* Reply input */}
                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="text"
                          placeholder="Write a helpful response for this comrade..."
                          value={replyTextMap[post.id] || ''}
                          onChange={(e) => setReplyTextMap({ ...replyTextMap, [post.id]: e.target.value })}
                          className="flex-1 px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-900"
                        />
                        <button
                          onClick={() => handleSendAnswer(post.id)}
                          className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-1 shrink-0"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Reply</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
