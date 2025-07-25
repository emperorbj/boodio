import { supabase } from '../lib/supabase';
import Toast from 'react-native-toast-message';
// These are all the logics for CRUD operations on supabase
export const fetchBooks = async () => {
    const { data, error } = await supabase.from('books').select('*');
    if (error) {
        throw error;
    }
    return data;
};





export const fetchLikes = async () => {
    const { data, error } = await supabase.from('library').select('*,books(*)');
    if (error) {
        throw error;
    }
    return data;
};





export const fetchUserProfile = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (!data) {
        Toast.show({
            type: 'error',
            text1: 'User not found',
        });
        return null;
    }

    if (error) {
        Toast.show({
            type: 'error',
            text1: 'Error fetching user profile',
            text2: error.message,
        });
        return null;
    }

    const { data: profileData, error: profileError } = await supabase
        .from('profile')
        .select('name,email')
        .eq('id', data.user.id)
        .maybeSingle();

    if (profileError) {
        Toast.show({
            type: 'error',
            text1: 'Error fetching profile data',
            text2: profileError.message,
        });
        return null;
    }
    return profileData;
};





export const fetchUserActivity = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (!data) {
        Toast.show({
            type: 'error',
            text1: 'User not found',
        });
        return null;
    }

    if (error) {
        Toast.show({
            type: 'error',
            text1: 'Error fetching user profile',
            text2: error.message,
        });
        return null;
    }

    const { data: recentData, error: recentError } = await supabase
        .from('recent_activity')
        .select('*')
        .eq('user_id', data?.user?.id)
        .order('created_at', { ascending: false })
        .limit(5);

    if (recentError) {
        Toast.show({
            type: 'error',
            text1: 'Error fetching recent activity',
            text2: recentError.message,
        });
        return null;
    }
    return recentData;
};





export const fetchAchievements = async () => {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) {
        throw new Error('User not found');
    }

    const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .eq('user_id', userData.user.id)
        .order('created_at', { ascending: false });

    if (error) {
        Toast.show({
            type: 'error',
            text1: 'Error fetching achievements',
            text2: error.message,
        });
        throw error;
    }

    return data;
};



export const awardAchievements = async () => {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) {
        Toast.show({ type: 'error', text1: 'User not found' });
        return;
    }

    const { data: sessions, error: sessionError } = await supabase
        .from('listening_sessions')
        .select('*')
        .eq('user_id', userData.user.id);

    if (sessionError) {
        Toast.show({ type: 'error', text1: 'Error fetching sessions', text2: sessionError.message });
        return;
    }

    const totalMinutes = sessions.reduce((sum, session) => sum + session.duration_minutes, 0);

    if (totalMinutes >= 4) {
        const { error } = await supabase.from('achievements').upsert({
            user_id: userData.user.id,
            achievement_type: 'book_lover',
            title: 'Book Lover',
            description: 'Listened to 1000+ minutes of books',
            icon: 'book',
        });
        if (error) {
            Toast.show({ type: 'error', text1: 'Error awarding Book Lover', text2: error.message });
        }
    }



    const hasNightSession = sessions.some((session) => {
        const hour = new Date(session.listened_at).getHours();
        return hour >= 0 && hour <= 4;
    });
    if (hasNightSession) {
        const { error } = await supabase.from('user_achievements').upsert({
            user_id: userData.user.id,
            achievement_type: 'night_owl',
            title: 'Night Owl',
            description: 'Listened to books after midnight',
            icon: 'time-outline',
        });
        if (error) {
            Toast.show({ type: 'error', text1: 'Error awarding Night Owl', text2: error.message });
        }
    }



    const uniqueBooks = new Set(sessions.map((session) => session.book_id)).size;
    if (uniqueBooks >= 50) {
        const { error } = await supabase.from('achievements').upsert({
            user_id: userData.user.id,
            achievement_type: 'trendsetter',
            title: 'Trendsetter',
            description: 'Listened to 50+ unique books',
            icon: 'trophy-outline',
        });
        if (error) {
            Toast.show({ type: 'error', text1: 'Error awarding Trendsetter', text2: error.message });
        }
    }
};
