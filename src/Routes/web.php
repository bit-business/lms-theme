<?php

use Illuminate\Support\Facades\Route;
use NadzorServera\Skijasi\Theme\LMSTheme\Controllers\InertiaController;
use NadzorServera\Skijasi\Theme\LMSTheme\Middlewares\HandleInertiaRequests;

$lms_route_prefix = config('lms-theme.lms_theme_prefix');

Route::prefix($lms_route_prefix)
    ->as('skijasi.lms-theme.')
    ->middleware(['web', HandleInertiaRequests::class])
    ->group(function () {
        Route::get('/', [InertiaController::class, 'view']);

        Route::get('/register', [InertiaController::class, 'register']);
        Route::get('/login', [InertiaController::class, 'login']);

        Route::get('/404', [InertiaController::class, 'pageNotFound']);

        Route::prefix('/course')->as('course.')->group(function () {
            Route::get('/create', [InertiaController::class, 'createCourse']);
            Route::get('/join', [InertiaController::class, 'joinCourse']);
            Route::get('/{id}', [InertiaController::class, 'announcement']);
            Route::get('/{id}/classwork', [InertiaController::class, 'classwork']);
            Route::get('/{id}/classwork/create', [InertiaController::class, 'createTopic']);
            Route::get('/{id}/classwork/update/{topicId}', [InertiaController::class, 'updateTopic']);
            Route::get('/{id}/classwork/create/material', [InertiaController::class, 'createMaterial']);
            Route::get('/{id}/classwork/create/quiz', [InertiaController::class, 'createQuiz']);
            Route::get('/{id}/classwork/quiz/{quizId}', [InertiaController::class, 'quiz']);
            Route::get('/{id}/classwork/quiz/{quizId}/update', [InertiaController::class, 'updateQuiz']);
            Route::get('/{id}/classwork/material/{materialId}', [InertiaController::class, 'lessonMaterial']);
            Route::get('/{id}/classwork/material/{materialId}/update', [InertiaController::class, 'updateMaterial']);
            Route::get('/{id}/classwork/create/assignment', [InertiaController::class, 'createAssignment']);
            Route::get('/{id}/classwork/assignment/{assignmentId}', [InertiaController::class, 'assignment']);
            Route::get('/{id}/classwork/assignment/{assignmentId}/update', [InertiaController::class, 'updateAssignment']);
            Route::get('/{id}/people', [InertiaController::class, 'people']);
        });
    });
