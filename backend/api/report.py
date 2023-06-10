from django.http import HttpResponse
from django.views.generic import View
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph
from reportlab.lib import colors
from django.db.models import Sum, F
from reportlab.lib.styles import getSampleStyleSheet
from .models import Book, BorrowedBook, Fine, User

class BookReportPDFView(View):
    def get(self, request, *args, **kwargs):
        # Generate book report data
        total_books = Book.objects.count()
        borrowed_books = BorrowedBook.objects.filter(status='BORROWED').count()
        late_return_books = BorrowedBook.objects.filter(status='RETURNED', return_date__gt=F('return_date')).count()
        total_fine = Fine.objects.filter(status='OVERDUE').aggregate(total_fine=Sum('fine_amount'))['total_fine'] or 0

        # Create the PDF document
        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="book_report.pdf"'

        doc = SimpleDocTemplate(response, pagesize=letter)
        elements = []

        # Define styles
        styles = getSampleStyleSheet()

        # Add report title
        elements.append(Paragraph('Book Report', styles['Title']))

        # Create table data
        data = [
            ['Total Books', str(total_books)],
            ['Borrowed Books', str(borrowed_books)],
            ['Late Return Books', str(late_return_books)],
            ['Total Fine', str(total_fine)]
        ]

        # Create table and table style
        table = Table(data)
        table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, 0), 14),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
            ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
            ('TEXTCOLOR', (0, 1), (-1, -1), colors.black),
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
            ('FONTSIZE', (0, 1), (-1, -1), 12),
            ('BOTTOMPADDING', (0, 1), (-1, -1), 6),
        ]))

        # Add table to elements
        elements.append(table)

        # Build the PDF document
        doc.build(elements)

        return response


class StudentReportPDFView(View):
    def get(self, request, *args, **kwargs):
        # Generate student report data
        students = User.objects.filter(can_view=True)
        student_report_data = []

        for student in students:
            late_return_books = BorrowedBook.objects.filter(user=student, status='RETURNED', return_date__gt=F('return_date')).count()
            total_fine = Fine.objects.filter(user=student, status='OVERDUE').aggregate(total_fine=Sum('fine_amount'))['total_fine'] or 0

            student_report_data.append([student.name, student.email, str(late_return_books), str(total_fine)])

        # Create the PDF document
        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="student_report.pdf"'

        doc = SimpleDocTemplate(response, pagesize=letter)
        elements = []

        # Define styles
        styles = getSampleStyleSheet()

        # Add report title
        elements.append(Paragraph('Student Report', styles['Title']))

        # Create table data
        data = [
            ['Student Name', 'Email', 'Late Return Books', 'Total Fine']
        ] + student_report_data

        # Create table and table style
        table = Table(data)
        table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, 0), 14),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
            ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
            ('TEXTCOLOR', (0, 1), (-1, -1), colors.black),
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
            ('FONTSIZE', (0, 1), (-1, -1), 12),
            ('BOTTOMPADDING', (0, 1), (-1, -1), 6),
        ]))

        # Add table to elements
        elements.append(table)

        # Build the PDF document
        doc.build(elements)

        return response
