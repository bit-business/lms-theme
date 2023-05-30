<?php

namespace NadzorServera\Skijasi\Theme\LMSTheme\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class InertiaController extends Controller
{
    public function joinCourse()
    {
        return Inertia::render('JoinCourse', [], 'lms-theme::app');
    }

    public function classwork($id)
    {
        return Inertia::render('ClassworkPage', ['id' => $id], 'lms-theme::app');
    }

    public function createTopic($id)
    {
        return Inertia::render('CreateTopic', ['id' => $id], 'lms-theme::app');
    }

    public function updateTopic($id, $topicId)
    {
        return Inertia::render('UpdateTopic', ['id' => $id, 'topicId' => $topicId], 'lms-theme::app');
    }

    public function people($id)
    {
        return Inertia::render('PeopleInCourse', ['id' => $id], 'lms-theme::app');
    }

    public function register()
    {
        return Inertia::render('register', [], 'lms-theme::app');
    }

    public function view()
    {
        return Inertia::render('ViewCourse', [], 'lms-theme::app');
    }

    public function login()
    {
        return Inertia::render('login', [], 'lms-theme:app');
    }

    public function createCourse()
    {
        return Inertia::render('course/CreateCourse', [], 'lms-theme::app');
    }

    public function announcement($id)
    {
        return Inertia::render('course/Announcement', ['id' => $id], 'lms-theme::app');
    }

    public function createMaterial($id)
    {
        return Inertia::render('course/CreateCourseMaterial', ['id' => $id], 'lms-theme::app');
    }

    public function lessonMaterial($id, $materialId)
    {
        return Inertia::render('course/CourseMaterial', [
            'courseId' => $id,
            'materialId' => $materialId,
        ], 'lms-theme::app');
    }

    public function updateMaterial($id, $materialId)
    {
        return Inertia::render('course/EditCourseMaterial', [
            'courseId' => $id,
            'materialId' => $materialId,
        ], 'lms-theme::app');
    }

    public function createAssignment($id)
    {
        return Inertia::render('course/CreateCourseAssignment', ['id' => $id], 'lms-theme::app');
    }

    public function assignment($id, $assignmentId)
    {
        return Inertia::render('course/Assignment', [
            'courseId' => $id,
            'assignmentId' => $assignmentId,
        ], 'lms-theme::app');
    }

    public function updateAssignment($id, $assignmentId)
    {
        return Inertia::render('course/EditCourseAssignment', [
            'courseId' => $id,
            'assignmentId' => $assignmentId,
        ], 'lms-theme::app');
    }

    public function pageNotFound()
    {
        return Inertia::render('404', [], 'lms-theme::app');
    }

    public function createQuiz($id)
    {
        return Inertia::render('course/CreateQuiz', ['id' => $id], 'lms-theme::app');
    }

    public function updateQuiz($id, $quizId)
    {
        return Inertia::render('course/EditQuiz', [
            'id' => $id,
            'quizId' => $quizId,
        ], 'lms-theme::app');
    }

    public function quiz($id, $quizId)
    {
        return Inertia::render('course/Quiz', [
            'courseId' => $id,
            'quizId' => $quizId,
        ], 'lms-theme::app');
    }
}
